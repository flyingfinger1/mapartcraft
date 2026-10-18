# Whether a block needs support block(s) underneath it

<!-- ⬜🟥🟧🟨🟩⬛🟦🟪🟫 -->
<!-- ⚪🔴🟠🟡🟢⚫🔵🟣🟤 -->

This document discusses methods used by the `Add blocks under` option.

__NB__: when we say 'gravity affected block' we actually mean 'block that mandates support beneath it'. For example: cobwebs, beacons, pressure plates etc. Sand, gravel, and concrete powder are just the first that come to my mind...

## No blocks

This is a self explanatory and pretty useless option as sand will fall and pressure plates 'pop' up

## Important blocks

For a block `B` that is affected by gravity we place a support block `S` below `B` to hold it up. This is a primitive method and is useful for pasting schematics in creative mode if mapdats are not an option. This method does not require knowledge of any blocks South of `B` to function, hence the count for support blocks can be updated as we create the map preview from North to South. However this method is not the best for building schematics in survival as the following options discuss.

## All blocks (optimized)

This option places support blocks as in [Important blocks](#Important-blocks), and also one to the North (`N`) and one to the South (`Z`) of `S` to allow `S` to be placed before `B` is placed, building the map in survival either from North to South or South to North, as in instance 3 below. One can imagine that without `N` and `Z`, `B` would fall under gravity before `S` could be built.

This option also adds support blocks when the map height changes to make building staircases easier in survival.

One way to go about implementing this method would be to add `N` and `Z` to the NBT / schematic whenever a gravity affected block is found, however this could lead to collisions between support-blocks and actual map blocks. Therefore instead we check the following seven criteria.

### Key
| Symbol | Means |
| ------ | ----- |
|   ⬜   | Air |
|   🟥   | Support block caused by ⬛ |
|   🟧   | Support block caused by 🟩 or 🟦 |
|   🟨   | Possible block to the North (unimportant) |
|   🟩   | Block to the North causing support blocks |
|   ⬛   | Block for which we are trying to find out whether support blocks are required underneath |
|   🟦   | Block to the South causing support blocks |
|   🟪   | Possible block to the South (unimportant) |

### The five instances in which a block needs a support block one block beneath it

1.  Block has light tone
    ```
    ⬜⬛
    🟨🟥
    ```

2.  Block to the South has dark tone
    ```
    ⬛⬜
    🟧🟦
    ```

3.  Block is gravity affected
    ```
    🟨⬛🟪                          B
    🟥🟥🟥      equivalently:      NSZ
    ```

4.  Block to the South has normal tone and is gravity affected
    ```
    ⬛🟦🟪
    🟧🟧🟧
    ```

5.  Block has normal tone and the block to the North is gravity affected
    ```
    🟨🟩⬛
    🟧🟧🟧
    ```

Instances 1 and 2 are consequences of changing map-height, 3, 4, 5 because of gravity affected blocks

### The two instances in which a block needs a support block two blocks beneath it

6.  Block to the South has dark tone and is gravity affected
    ```
    ⬛⬜⬜
    🟧🟦🟪
    🟧🟧🟧
    ```

7.  Block has light tone and the block to the North is gravity affected
    ```
    ⬜⬜⬛
    ⬜🟩🟥
    🟧🟧🟧
    ```

Instances 6 and 7 combine both changing map-height and gravity affected blocks

These seven instances apply to the average block in a column, where a 'column' is a slice of the map running from North to South. However, there are some special cases:

- Noobline: Only instances 2, 4, 6 apply
- First (non-noobline) block: Only instances 1, 2, 3, 4, 6 apply
- Last block: Only instances 1, 3, 5, 7 apply

Some of these criteria require knowledge of the map block to the South of `B`, whether it is gravity affected and what tone it is. Hence while building a column from North to South (in `getPhysicalColumn` in `src/components/mapart/workers/physicalLayout.jsworker`) we work 'one cycle behind' in placing support blocks; we switch based on the row we have just placed:

- Case 0: Check the relevant instances for whether the noobline needs support
- Case 1: Check the relevant instances for whether the first non-noobline block needs support
- Case 127: Check the relevant instances for whether the last block in the column needs support __and fallthrough to default case__
- Default: Having placed the block of row `z`, check the instances for whether the block of row `z-1` needs support

The map preview counts support blocks by running the same `getPhysicalColumn`, so the materials list always matches the exported schematic.

## All blocks double (optimized)

The reason for this mode is to enable the user to build all of the support blocks first instead of juggling many shulkers full of support blocks alongside each material required to build the visible map at the same time as in [All blocks (optimized)](#All-blocks-(optimized)). This mode requires a lot more support blocks, building an entire layer of 128*128 = 16384 at the minimum, however this is often not an issue for many players (collecting stacks of netherrack from 2b2t tunnels is easy). I (SelfAdjointOperator) have built 2x1 maps both in single and double mode before: although double mode can seem tedious at first, placing support blocks to seemingly no end, it is pleasant being able to then build the map colourSet by colourSet, with less inventory management problems. However, this was before single-blocks mode was optimized; I will compare in the future which I think is the best use of time.

In effect we create a carbon-copy of the map structure as it would appear in [No blocks](#No-blocks) one block below the original, made entirely out of support blocks. We then only have to add extra support blocks for height changes as in instances 1 and 2 of [All blocks (optimized)](#All-blocks-(optimized)). This is a little easier to code than single-blocks mode, and `Case 1` does not need to be treated specially.

## Overhangs in valley staircasing

Each support block remembers why it was placed: either it holds up the block directly above it (instances that involve a gravity affected block, and every block in [All blocks double (optimized)](#All-blocks-double-(optimized))), or it is an anchor that sits next to a target block at the same height so that the target can be placed against it, for example `S` next to a block that steps down.

Valley staircasing pulls plateaus and the valleys between them down by different amounts. All blocks with the same z-value move together, so a support block always keeps holding the block above it, but an anchor's target can end up at a different height. A support block whose reasons are all gone is an overhang that only costs material, and it is removed. Since an anchor can target another support block, this is repeated until nothing changes. A support block beneath a gravity affected block is never removed.
