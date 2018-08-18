const express = require ('express');
const authRoutes = require ('./routes/auth-routes');
const profileRoutes = require ('./routes/profile-routes');
const passport = require ('passport');
const passportSetup = require ('./config/passport-setup');
const mongoose = require ('mongoose');
const app = express();
const keys = require ('./config/keys');
const cookieSession = require ('cookie-session');

// set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURL);
console.log('|||| successfull connected to mongodb ||||');

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/',(req, res) => {
    res.render('home', {user:req.user});
});

app.listen(80, () =>  {
console.log('|||| app now listening now in port 80 ||||');


});
