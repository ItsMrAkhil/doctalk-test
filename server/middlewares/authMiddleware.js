function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'You are not authenticated' });
}

module.exports = {
  isLoggedIn,
};
