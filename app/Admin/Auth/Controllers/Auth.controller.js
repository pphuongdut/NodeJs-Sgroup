const bcrypt = require('bcrypt');
const knex = require('../../../../database/knex');
const { validationResult } = require('express-validator');
// Render
const loginRender = (req, res) => {
    return res.render('Login', {
        title: 'Login',
    });
};
const registerRender = (req, res) => {
    return res.render('register', {
        title: 'Register',
    });
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
            return res.redirect('/login');
        } else {
            req.session.user = user;
            console.log(user);
            return res.redirect('/users');
        }
    } else {
        return res.redirect('/login');
    }
};
const registerMethod = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
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
