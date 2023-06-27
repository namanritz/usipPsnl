const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;


passport.serializeUser((user , done) => {
  done(null , user);
  })
  passport.deserializeUser(function(user, done) {
  done(null, user);
  });


passport.use(
  new GoogleStrategy({
      clientID:"228190589588-if2t07me8io00ue434b82tqp71pvak9c.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:'/student/googleLogin/callback',
      passReqToCallback:true,
  },
  function(request,accessToken,refreshToken,profile,done){
    //console.log(profile);
    return done(null,profile);
  }
  )
);

