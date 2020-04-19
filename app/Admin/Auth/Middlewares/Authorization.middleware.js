// check user to login
const verifyAuthorization = (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user.roleId == 1) {
        return next();
    }
    return res.redirect('/admin/login');
};
const verifynotAuthorization = (req, res, next) => {
    if (!req.session.user.roleId == 1) {
        return next();
    }
    return res.redirect('/admin');
};

module.exports = {
    verifynotAuthorization,
    verifyAuthorization,
};
