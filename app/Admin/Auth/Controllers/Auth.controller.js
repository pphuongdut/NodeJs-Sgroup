const bcrypt = require('bcrypt');
const knex = require('../../../../database/knex');
const { validationResult } = require('express-validator');
const slugify = require('slugify');
// Render
const loginRender = (req, res) => {
    return res.render('admin/pages/Login', {
        title: 'Login',
        errors: req.flash('errors'),
    });
};
const registerRender = (req, res) => {
    return res.render('admin/pages/register', {
        title: 'Register',
        errors: req.flash('errors'),
    });
};
const homepageRender = (req, res) => {
    const usernow = req.session.user;
    return res.render('admin/pages/index', {
        title: 'Home',
        usernow: usernow,
    });
};
const dashboardRender = (req, res) => {
    const usernow = req.session.user;
    return res.render('admin/pages/dashboard', {
        title: 'Dashboard',
        usernow: usernow,
    });
};
//Method
const loginMethod = async (req, res, Promise) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    const user = await knex('users')
        .where({
            email: email,
        })
        .select('*')
        .first();
    console.log(user);
    if (user) {
        const result = bcrypt.compare(password, user.password);
        console.log(result);
        console.log(bcrypt.compare(password, user.password));
        if (!result) {
            req.flash('errors', {
                param: 'password',
                msg: 'Wrong password',
            });
            return res.redirect('/admin/login');
        } else {
            req.session.user = user;
            return res.redirect('/admin/users');
        }
    }
    if (!user) {
        req.flash('errors', {
            param: 'email',
            msg: 'Email does not exist',
        });
        console.log(errors.array());
        return res.redirect('/admin/login');
    }
};

const registerMethod = async (req, res, Promise) => {
    console.log('checked')
    const { email, password, fullname, username } = req.body;
    console.log(validationResult(req));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        req.flash('errors', errors.array());
        return res.redirect('/admin/register');
    }
    const user = await knex('users')
        .where({
            email: req.body.email,
        })
        .first();
    if (user) {
        req.flash('errors', { param: 'email', msg: 'Email is already in use' });
        return res.redirect('/admin/register');
    } else {
        console.log('OK');
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await knex('users').insert({
            fullname: fullname,
            username: username,
            email: email,
            password: hashedPassword,
            user_slug: slugify(email),
        });
        return res.redirect('/admin/login');
    }
};
const logoutMethod = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/login');
        }
    });
};

module.exports = {
    loginRender,
    registerRender,
    homepageRender,
    dashboardRender,
    loginMethod,
    registerMethod,
    logoutMethod,
};
