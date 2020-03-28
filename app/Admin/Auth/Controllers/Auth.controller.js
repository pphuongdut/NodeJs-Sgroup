const bcrypt = require('bcrypt');
const knex = require('../../../../database/knex');
const { validationResult } = require('express-validator');

// Render
const loginRender = (req, res) => {
    return res.render('Login', {
        title: 'Login',
        errors: '',
        messages: '',
    });
};
const registerRender = (req, res) => {
    return res.render('register', {
        title: 'Register',
        errors: '',
    });
};
const homepageRender = (req, res) => {
    return res.render('index', {
        title: 'Home',
    });
};
//Method
const loginMethod = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    const user = await knex('users')
        .where({
            email: email,
        })
        .select('*')
        .first();
    if (user) {
        var result = bcrypt.compareSync(password, user.password);
        if (!result) {
            req.flash('error', 'Wrong password');
            return res.redirect('/login');
        } else {
            req.session.user = user;
            console.log(user);
            return res.redirect('/users');
        }
    } else {
        req.flash('error', 'Email is not exist');
        return res.render('/login', {
            errors: errors.array(),
            messages: '',
        });
    }
};

const registerMethod = async (req, res, next) => {
    const { email, password, fullname, username } = req.body;
    console.log(validationResult(req));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('/register', {
            errors: errors.array(),
        });
    } else {
        console.log('đăng kí oke');
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await knex('users').insert({
            fullname: fullname,
            username: username,
            email: email,
            password: hashedPassword,
        });
        //Success Message
        req.flash('success', `${name} Log in now`);
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
