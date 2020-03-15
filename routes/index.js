
const express = require('express');

const router = express.Router();

const knex = require('../database/knex');

router.get('/', function(req, res) {
    if (req.session.user) {
        return res.render('index', {title: 'My app'});
    }
    return res.redirect('/login');
})

router.route('/').get((req, res) => {
        return res.render('Login', { title: 'Login' });
    }) .post(async (req, res) => {
        const user = await knex('users')
            .where({
                email: req.body.email,
                password: req.body.password,
            })
            .select('*');
        if (user.length === 0) {
            return res.redirect('/login');
        }
        if (user.length !== 0) {
            req.session.user = user;
            return res.redirect('/');
        })
    })

router.route('/').get((req, res) => {
     return res.render('register', { title: 'Register' });
    }).post(async (req, res) => {
        await knex('users').insert({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        return res.redirect('/login');
    }),
module.exports = router