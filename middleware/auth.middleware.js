
const verifyAuthentication = (req,res,next ) => {
  if(req.session.user) {
    return next();
  }
  return res.redirect('/login');
}
const verifynotAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/users');
};

module.exports = {verifyAuthentication, verifynotAuthentication}