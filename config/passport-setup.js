const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});

passport.use(
  new VKontakteStrategy({
    // options for the vk strategy
    callbackURL:'/auth/vk/redirect',
    clientID:keys.vk.clientID,
    clientSecret:keys.vk.clientSecret
  }, (accessToken, refreshToken, params, profile, done) => {
  //  passport callback function
  //  console.log('passport callback function fired');
  //  console.log('|||| USER DATA BEGIN ||||');
  //  console.log(profile);
  //  console.log('|||| USER DATA END ||||');
      User.findOne({idvk:profile.id}).then((currentUser) => {
        if(currentUser){
          // allready have the user
          console.log('|||| user is logged in: ', currentUser, ' ||||');
          done(null, currentUser);
        } else {
          //if not, create user in db
          new User({
          username:profile.displayName,
          idvk: profile.id,
          thumbnail: profile._json.photo
        }).save().then((newUser) => {
          console.log('|||| new user created: '+ newUser, ' ||||');
          done(null, newUser);
        });
        }
      })
  })
);
