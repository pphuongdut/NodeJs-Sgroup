// check user to login
const verifyAuthorization = (req, res, next) => {
    console.log(1);
    if (req.session.user.roleId == 1) {
        return next();
    }
    return res.redirect('/admin/login');
};
const verifynotAuthorization = (req, res, next) => {
    console.log(2);
    console.log(req.session.user.roleId);
    if (req.session.user.roleId !== 1) {
        return res.redirect('/Judostore');
    } else return next();
};
module.exports = {
    verifynotAuthorization,
    verifyAuthorization,
};
