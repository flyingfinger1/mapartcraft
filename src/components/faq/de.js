function FAQContent_de({ images }) {
  return (
    <>
      <h1>FAQ</h1>

      <h2>Wie fange ich an?</h2>
      <a href="https://youtu.be/bJ-wX68WNHM" target="_blank" rel="noopener noreferrer">
        Video-Tutorial (Englisch)
      </a>

      <h2>Allgemein</h2>
      <b>Welche Minecraft-Versionen werden unterstützt?</b>
      <p>
        Java Edition 1.12.2 bis 26.3, auswählbar unter <em>Einstellungen</em>. Steht Deine Version nicht in der Liste, nimm die nächstältere: Minecraft
        aktualisiert ältere Schematics und Kartendateien beim Laden. Blöcke, die es in der gewählten Version nicht gibt, werden in der Blockauswahl ausgeblendet.
      </p>

      <b>Wo melde ich Fehler oder wünsche mir Funktionen?</b>
      <p>
        Auf{" "}
        <a href="https://github.com/flyingfinger1/mapartcraft/issues" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        . Diese Version ist ein Fork von{" "}
        <a href="https://github.com/rebane2001/mapartcraft" target="_blank" rel="noopener noreferrer">
          rebane2001s MapartCraft
        </a>
        , melde Probleme damit also bitte hier und nicht beim ursprünglichen Projekt.
      </p>

      <b>Warum ändert sich das Ergebnis bei gleichem Bild und gleichen Einstellungen?</b>
      <p>
        Die Algorithmen zum Dekodieren und Skalieren von JPEGs unterscheiden sich zwischen Browsern und ändern sich ständig. Wenn Du sicher sein willst, dass
        Dein Bild gleich bleibt, klicke mit der rechten Maustaste auf die <em>Map-Vorschau</em> und wähle <em>Bild speichern unter...</em>. Beim nächsten Mal
        kannst Du das gespeicherte Bild hochladen.
      </p>

      <h2>Schematic (.nbt)</h2>
      <b>Was mache ich mit der NBT-Datei?</b>
      <p>Verwende sie wie eine .schematic-Datei.</p>

      <b>Womit kann ich die NBT-Datei verwenden?</b>
      <p>
        Du kannst sie mit Mods wie{" "}
        <a href="https://modrinth.com/mod/litematica" target="_blank" rel="noopener noreferrer">
          Litematica
        </a>{" "}
        laden (für Litematica ist der <a href="#litematic">.litematic-Download</a> bequemer) und mit Programmen wie{" "}
        <a href="https://cubical.xyz/" target="_blank" rel="noopener noreferrer">
          cubical.xyz
        </a>
        . Du kannst sie auch direkt im Spiel mit einem Konstruktionsblock importieren, eventuell braucht er dafür ein Redstone-Signal (
        <a href="https://github.com/rebane2001/mapartcraft/issues/100" target="_blank" rel="noopener noreferrer">
          #100
        </a>
        ). Oft ist eine Kartendatei (.dat) die bessere Wahl: Sie ist einfacher und bietet mehr Farben.
      </p>

      <b>...aber ich brauche eine .schematic-Datei!</b>
      <p>
        Importiere sie in{" "}
        <a href="https://cubical.xyz/" target="_blank" rel="noopener noreferrer">
          cubical.xyz
        </a>{" "}
        oder{" "}
        <a href="https://www.mcedit-unified.net/" target="_blank" rel="noopener noreferrer">
          MCEdit
        </a>{" "}
        und exportiere sie als .schematic (nur für alte Programme und Versionen nötig). <em>Mit MCEdit oder Cubical musst Du die Karte als 1.12.2 exportieren.</em>{" "}
        Für Baritone brauchst Du keine .schematic-Datei; nutze Schematica und den Befehl "#schematica".
      </p>

      <b>Aber MCEdit funktioniert nicht!</b>
      <p>
        Achte darauf, dass Du{" "}
        <a href="https://www.mcedit-unified.net/" target="_blank" rel="noopener noreferrer">
          MCEdit Unified
        </a>{" "}
        verwendest und die NBT-Datei als Schematic importierst, NICHT als Welt lädst. Alternativ kannst Du Cubical verwenden.
      </p>

      <b>Warum gibt es eine zusätzliche Reihe Blöcke?</b>
      <p>
        Welcher Farbton eines Blocks auf der Karte erscheint, hängt vom Block nördlich davon ab: Liegt der nördliche Block höher, erscheint ein dunklerer Ton,
        liegt er tiefer, ein hellerer, sonst ein normaler. Deshalb gibt es am oberen Rand der Karte eine zusätzliche Blockreihe (umgangssprachlich "Noobline"),
        damit die oberste Reihe richtig schattiert wird.
      </p>
      <p>
        Lässt Du sie mit <em>Stützblöcke/Noobline in der ersten Reihe weglassen</em> weg, hängt die Schattierung der obersten Reihe davon ab, was in Deiner Welt
        nördlich der Karte liegt. Mach das also nur, wenn Du weißt, was dort ist (zum Beispiel direkt neben einer bestehenden Karte).
      </p>

      <b>Wie richte ich die Karte aus?</b>
      <p>
        Wenn Du einen geeigneten Bauplatz gefunden hast (z. B. über einem Ozean), öffne zuerst die Karte und suche die untere linke Ecke, um Dein Schematic daran
        auszurichten. Karten in Minecraft richten sich an einem festen 128x128-Raster aus. Norden ist auf Karten immer oben, Du solltest das Schematic also nicht
        drehen müssen.
      </p>

      <h2 id="litematic">Litematic (.litematic)</h2>
      <b>Was ist die .litematic-Datei?</b>
      <p>
        Das eigene Schematic-Format der Mod{" "}
        <a href="https://modrinth.com/mod/litematica" target="_blank" rel="noopener noreferrer">
          Litematica
        </a>
        . Sie enthält dieselben Blöcke wie der NBT-Download, inklusive Stützblöcken und Noobline.
      </p>

      <b>Wie verwende ich sie?</b>
      <p>
        Lege die Datei in den Ordner <em>schematics</em> in Deinem Minecraft-Verzeichnis, öffne im Spiel das Litematica-Menü (standardmäßig <em>M</em>), wähle{" "}
        <em>Load Schematics</em> und lade sie. Platziere sie wie oben beschrieben passend zum Kartenraster. Litematica kann das Schematic dann Schicht für Schicht
        anzeigen und auflisten, welche Materialien Dir noch fehlen.
      </p>

      <b>Kann ich geteilte .litematic-Dateien herunterladen?</b>
      <p>
        Ja: "DOWNLOAD LITEMATIC" liefert ein Schematic für die ganze Karte, "DOWNLOAD LITEMATIC ALS 1x1 TEILE" eine .zip-Datei mit einem Schematic pro Karte,
        genau wie beim NBT-Download.
      </p>

      <h2>Kartendatei (.dat)</h2>
      <b>Was ist eine map.dat-Datei?</b>
      <p>
        '.dat' ist das Format, in dem Minecraft Kartendaten speichert. Damit kannst Du Karten in Deine Welten importieren, ohne ein Bauwerk errichten zu müssen.
        Außerdem steht Dir damit ein vierter Farbton zur Verfügung, den es im Survival nicht gibt.
      </p>

      <b>Was mache ich mit der map.dat-Datei?</b>
      <p>
        Du kannst die map.dat-Datei im Einzelspieler oder auf einem eigenen Server verwenden. Erstelle im Spiel eine neue Karte, öffne den Speicherordner Deiner
        Welt und darin den Ordner <em>data</em>. Dort kannst Du die Dateien map_xxx.dat ersetzen. MapartCraft lädt eine .zip-Datei mit allen 1x1-map.dat-Dateien
        herunter.
      </p>

      <h2>Einstellungen</h2>
      <b>Maße?</b>
      <p>
        Hier legst Du fest, aus wie vielen Karten Dein Bild besteht. Bei größeren Karten empfiehlt es sich, sie in mehrere Schematics aufzuteilen, damit große
        3D-Karten nicht über die Bauhöhengrenze hinausragen. Das geht mit den Buttons "DOWNLOAD NBT ALS 1x1 TEILE" und "DOWNLOAD LITEMATIC ALS 1x1 TEILE", die alle 1x1-NBTs bzw. -Litematics in einer .zip-Datei
        herunterladen.
      </p>

      <b>Mein Bild ist verzerrt!</b>
      <p>Ändere die Maße, aktiviere <em>Zuschneiden</em> oder bearbeite Dein Bild mit einem Bildbearbeitungsprogramm.</p>

      <b>'Staircasing'?</b>
      <p>
        Damit wird Deine Karte 3D. Das verdreifacht die Zahl der Farben und ergibt oft ein deutlich schöneres Mapart, macht die Karte aber auch viel schwerer zu
        bauen, weil sie nicht flach ist. Die 3D-Modi 'Klassisch' und 'Valley' ergeben genau dasselbe Kartenbild, werden aber unterschiedlich gebaut: Im
        'Valley'-Modus kommt die Karte ohne abwärts führende Treppen aus, was im Survival einfacher sein kann. Der Unterschied:
      </p>
      <div style={{ textAlign: "center" }}>
        <img alt="classicVsValley.png" src={images.classicVsValley} style={{ maxWidth: "75%" }}></img>
      </div>
      <p>
        Weitere Staircasing-Modi lassen sich im Einstellungs-Reiter <em>Extras</em> aktivieren.
      </p>

      <b>Kann ich ein 3D-Mapart (mit Staircasing) drehen?</b>
      <p>
        Nein! Anders als flache Maparts hängt die Schattierung bei 3D-Maparts von der Nord-Süd-Richtung ab. Drehst Du das Schematic, stimmt die Schattierung
        nicht mehr und die Karte sieht im Spiel falsch aus. Platziere das Schematic immer in seiner ursprünglichen Ausrichtung. Siehe auch:{" "}
        <a href="https://github.com/rebane2001/mapartcraft/issues/297" target="_blank" rel="noopener noreferrer">
          #297
        </a>
        .
      </p>

      <b>Verbesserte Farben?</b>
      <p>
        Diese Einstellung sorgt für natürlichere Farben. Schaltest Du sie aus, wird die Seite schneller, die Farben aber etwas schlechter. Es wird empfohlen, sie
        eingeschaltet zu lassen.
      </p>

      <b>Dithering?</b>
      <p>
        Damit bekommt Dein Bild eine Körnung, die es deutlich weicher wirken lässt. Floyd-Steinberg ist am genauesten, Ordered/Bayer-Dithering erzeugt meist
        weniger Artefakte und gibt dem Bild einen eigenen Stil. Für Bilder mit flächigen Farben empfiehlt es sich meist, Dithering auszuschalten.
      </p>

      <b>Platziere Blöcke unter / Platzierter Block?</b>
      <p>
        Hier wählst Du den Block, der entweder unter wichtige Blöcke (z. B. Teppiche, Sand, Druckplatten) oder unter alle Blöcke gesetzt wird. Derselbe Block wird
        auch für die Noobline verwendet. Beim 'Valley'-Staircasing werden Stützblöcke weggelassen, die beim Bauen nicht mehr helfen; Stützblöcke unter Blöcken,
        die Halt brauchen, bleiben immer erhalten. Die Zahl der Stützblöcke unter <em>Materialien</em> entspricht genau dem Inhalt des Schematics.
      </p>

      <b>Vorlagen?</b>
      <p>
        Mit Vorlagen kannst Du Blockauswahlen speichern und laden. Wähle Deine Blöcke und klicke auf "Speichern", um sie als Vorlage zu sichern. Wähle eine
        Vorlage, um sie zu laden, und klicke auf "Entfernen", um die geladene Vorlage zu löschen. Du kannst auch einen Link zu Deiner Vorlage mit anderen teilen.
      </p>

      <h2>Eigene Blöcke</h2>
      <p>
        Eigene Blöcke kannst Du unten in der Blockauswahl hinzufügen. Für denselben Blocknamen lassen sich verschiedene Versionen anlegen, z. B. für 1.12.2 und
        1.13.2+. Im Abschnitt 'Beispiele' findest Du einige Muster. NBT-Tags bzw. Blockzustände findest Du im{" "}
        <a href="https://de.minecraft.wiki/w/Blockzustand" target="_blank" rel="noopener noreferrer">
          Minecraft Wiki
        </a>
        . Um einen eigenen Block zu bearbeiten, wähle ihn aus, ändere Tags, Versionen usw. und klicke auf 'Hinzufügen', um ihn zu überschreiben. Links zu Vorlagen
        enthalten keine eigenen Blöcke.
      </p>

      <div style={{ textAlign: "center" }}>
        <img alt="Palette" src={images.palette} />
      </div>
    </>
  );
}

FAQContent_de.closeLabel = "Schließen";

export default FAQContent_de;
