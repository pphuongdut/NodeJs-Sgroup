const knex = require('../../../database/knex');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const { validationResult } = require('express-validator');
const loginRender = (req, res) => {
    return res.render('client/pages/login', {
        title: 'Login',
        errors: req.flash('errors'),
    });
};
const registerRender = (req, res) => {
    return res.render('client/pages/register', {
        title: 'Sign in',
        errors: req.flash('errors'),
    });
};
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
        const result = await bcrypt.compare(password, user.password);
        console.log(result);
        if (!result) {
            req.flash('errors', {
                param: 'password',
                msg: 'Wrong password',
            });
            return res.redirect('/login');
        } else {
            req.session.user = user;
            return res.redirect('/JudoStore');
        }
    }
    if (!user) {
        req.flash('errors', {
            param: 'email',
            msg: 'Email does not exist',
        });
        console.log(errors.array());
        return res.redirect('/login');
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
        return res.redirect('/register');
    }
    const user = await knex('users')
        .where({
            email: req.body.email,
        })
        .first();
    if (user) {
        req.flash('errors', { param: 'email', msg: 'Email is already in use' });
        return res.redirect('/register');
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
            roleId: '2',
        });
        return res.redirect('/login');
    }
};

const logoutMethod = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
};
module.exports = {
    loginRender,
    loginMethod,
    registerMethod,
    registerRender,
    logoutMethod,
};
