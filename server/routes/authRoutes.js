const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ hi: 'friend' });
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/'
    }),
    (req, res) => {
      req.session.token = req.user.token;
      res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
  });
};
