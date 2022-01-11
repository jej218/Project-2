const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/user");
//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile, "<----- Profile"); //FIXME: a user has logged in via OAuth!
        // refer to the lesson plan from earlier today in order to set this up
        User.findOne({ googleId: profile.id }, function(err, userDoc) {
            if (err) return cb(err);

            if (userDoc) {
                console.log(userDoc + '<---userDoc') // FIXME:
                return cb(null, userDoc);
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                });

                newUser.save(function(err) {
                    if (err) return cb(err);
                    console.log(newUser, '<------newUser'); // FIXME:
                    return cb(null, newUser);
                })
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
    // When you call this done function passport assigns the user document to req.user, which will 
    // be availible in every Single controller function, so you always know the logged in user
    User.findById(id, function(err, user) {
        done(err, user);
    })

});