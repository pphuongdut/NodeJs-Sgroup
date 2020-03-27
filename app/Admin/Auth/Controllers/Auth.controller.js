const bcrypt = require('bcrypt');
const knex = require('../../../../database/knex');
const {check, validationResult } = require('express-validator');
const flash = require('connect-flash-plus');

// Render
const loginRender = (req, res) => {
    return res.render('Login', {
        title: 'Login',
    });
};
const registerRender = (req, res) => {
    return res.render('register', {
        title: 'Register', success: false, errors: req.session.errors
    });
    req.session.errors=null;
};
const homepageRender = (req, res) => {
    return res.render('index', {
        title: 'Home',
    });
};
//Method
const loginMethod = async (req, res) => {
    const { email, password } = req.body;
    const user = await knex('users')
        .where({
            email: email,
        })
        .select('*')
        .first();
    if (user) {
        var result = bcrypt.compareSync(password, user.password);
        console.log(user.password);
        console.log(result);
        if (!result) {
            return res.redirect('/login', );
        } else {
            req.session.user = user;
            console.log(user);
            return res.redirect('/users');
        }
    } else {
        return res.redirect('/login');
    }
};
const registerMethod = async (req, res,next) => {
    const errors = validationResult(req);
    console.log(validationResult(req));
    if (errors) {
        req.session.errors =errors;
        req.session.success = true; 
        console.log(errors)
        return next();
    }
    else {
        console.log('đăng kí oke')
    const { email, password, fullname, username } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await knex('users').insert({
        fullname: fullname,
        username: username,
        email: email,
        password: hashedPassword,
    });
    return res.redirect('/login');
}

};
const logoutMethod = async (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
};

module.exports = {
    loginRender,
    registerRender,
    homepageRender,
    loginMethod,
    registerMethod,
    logoutMethod,
};
