const router = require('express')();
const passport = require('passport');
const { isLength, isEmail } = require('validator');

const logger = require('../../logger');
const User = require('../../models/User');

router.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Name required.' });
  } else if (!isLength(name, { min: 3, max: 30 })) {
    return res.status(400).json({ success: false, message: 'Name length should between 3 and 30.' });
  } else if (!email) {
    return res.status(400).json({ success: false, message: 'Email required.' });
  } else if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  } else if (!password) {
    return res.status(400).json({ success: false, message: 'Password required.' });
  } else if (!isLength(password, { min: 6, max: 25 })) {
    return res.status(400).json({ success: false, message: 'Password length should between 6 and 25.' });
  }
  const newUser = new User({ name, email });
  return User.register(newUser, password, (errCreateUser, user) => {
    if (errCreateUser || !user) {
      res.status(500).json({ success: false, message: 'Error in creating user' });
      return logger.error(errCreateUser);
    }
    return res.status(201).json({ success: true, message: 'Successfully Registered.' });
  });
});

router.post('/api/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email required.' });
  } else if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  } else if (!password) {
    return res.status(400).json({ success: false, message: 'Password required.' });
  }
  return passport.authenticate('local-user', { session: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Something went wrong.' });
    } else if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }
    const loggedInUser = { email: user.email, name: user.name };
    return req.login(user, (errLogin) => {
      if (errLogin) {
        next(errLogin);
        return res.status(500).json({ success: false, message: 'Error while trying to login.' });
      }
      return res.status(200).json({ success: true, message: 'Successfully logged in', user: loggedInUser });
    });
  })(req, res, next);
});

router.all('/api/logout', (req, res) => {
  req.logout();
  return res.status(200).json({ success: true, message: 'Successfully logged out.' });
});

router.get('/api/user-details', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: true, message: 'Logged in', user: req.user });
  }
  return res.status(401).json({ success: false, message: 'Not logged in' });
});

module.exports = router;
