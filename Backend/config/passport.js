const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const users = require('../models/user');

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(user => user.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return done(null, false, { message: 'Incorrect password.' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const user = users.find(user => user.username === username);
  done(null, user);
});
