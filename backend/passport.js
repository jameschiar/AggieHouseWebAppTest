const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID = "509740822970-qcdsb7b99544l2vhmnpsb43icd4p665n.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    // // store user in DB here
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log("Google profile has arrived: ", profile);

    const user = {
      username: profile.displayName,
      avatar: profile.photos[0]
    };

    console.log("User object: ", user);
    
    done(null,profile);
    
  }
));

passport.serializeUser((user, done) => {
  
})