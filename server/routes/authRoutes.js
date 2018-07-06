const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hi: "friend" });
  });

  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: [
        "streaming",
        "user-read-birthdate",
        "user-read-email",
        "user-read-private"
      ],
      showDialog: true
    })
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", {
      failureRedirect: "/"
    }),
    (req, res) => {
      req.session.token = req.user.token;
      res.redirect("/");
    }
  );

  app.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
  });
};
