module.exports = function setupProxy(app) {
  app.get("*.jsworker", (req, res, next) => {
    res.type("application/javascript");
    next();
  });
};