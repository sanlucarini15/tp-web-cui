const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const users = require('../models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = users.find(user => user.username === username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const user = users.find(user => user.username === username);
    if (user) {
        done(null, user);
    } else {
        done(new Error('User not found'), null);
    }
});

module.exports = passport;
