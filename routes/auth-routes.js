const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login',(req, res) => {
  res.render('login', {user:req.user});
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
});

// auth with vk
router.get('/vk', passport.authenticate('vkontakte', {
  scope: ['profile']
}));

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

// callback route for vk to redirect to
router.get('/vk/redirect', passport.authenticate('vkontakte'), (req, res) => {
  //res.send(req.user);
  res.redirect('/profile/');
});

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  //res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;
