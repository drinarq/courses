const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('./repository/user.js');

module.exports = function(passport) {
    passport.use("local",
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            async function(req, email, password, done) {
                const user = await userRepository.getUserByEmail(email);
                if (!user) {
                    return done(null, false, {
                        status: 400,
                        message: 'Incorrect data 1',
                        success: false
                    });
                }


                console.log(password+"passport");
                console.log(user.password+"passport");

                if (!user.validatePassword(password, user.password)) {

                    return done(null, false, {
                        status: 400,
                        message: 'Incorrect data 2',
                        success: false
                    });
                }

                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userRepository.getUser(id);
        done(null, user);
    });
};