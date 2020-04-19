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
    console.log(req.session.user.roleId);
    if (req.session.user.roleId == 1) {
        return res.render('admin/pages/index', {
            title: 'Home',
            usernow: usernow,
        });
    } else res.redirect('/JudoStore');
};
const dashboardRender = (req, res) => {
    const usernow = req.session.user;
    if (req.session.user.roleId == 1) {
        return res.render('admin/pages/dashboard', {
            title: 'Dashboard',
            usernow: usernow,
        });
    } else res.redirect('/JudoStore');
};
//Method
const loginMethod = async (req, res, Promise) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    const user = await knex('users')
        .leftJoin('role', 'users.roleId', 'role.role_id')
        .where({
            email: email,
            role_name: 'admin',
        })
        .select('*')
        .first();
    console.log(user);
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        console.log(result);
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
    console.log('checked');
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
            roleId: '1',
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
const addRole = async (req, res) => {
    await knex('role').insert({
        role_name: req.body.role_name,
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
    addRole,
};
