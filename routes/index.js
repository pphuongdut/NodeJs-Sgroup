const express = require('express');
const router = express.Router();

const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const authmiddleware = require('../middleware/auth.middleware');
const methodOverride = require('method-override');
const users = knex('users');
// users
router.use('/users', authmiddleware.verifyAuthentication, async function(
    req,
    res,
) {
    const users = await knex('users').select('*');
    res.render('users', { title: 'Users', users: users });
});
//home
router.get('/', function(req, res) {
    return res.render('index', { title: 'Home' });
});
// // check user to login
router
    .route('/login')
    .get(authmiddleware.verifynotAuthentication, function(req, res) {
        return res.render('Login', { title: 'Login' });
    })
    .post(async (req, res) => {
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
    });

// make new user

router
    .route('/register')
    .get(authmiddleware.verifynotAuthentication, function(req, res) {
        return res.render('register', { title: 'Register' });
    })
    .post(async (req, res) => {
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
    }),
    //logout
    router.post('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        });
    });

//view user
router.route('/users/:id').get(async function(req, res) {
    const user = await knex('users')
        .where({
            id: req.params.user_id,
        })
        .first('*');
    console.log(user);
    console.log(req.params);
    return res.render('userprofile', {
        title: 'Profile',
        user,
    });
});

// // edit user
router
    .route('/:id/edit')
    .put(authmiddleware.verifyAuthentication, async function(req, res) {
        await knex('users')
            .where({
                id: req.params.user_id,
            })
            .update({
                fullname: req.body.fullname,
                username: req.body.username,
            });
        return res.redirect('/users');
    });

// //delete user
router
    .route('/:id/delete')
    .delete(authmiddleware.verifyAuthentication, async function(req, res) {
        await knex('users').where({
    id: req.params.user_id,
  }).delete();
        return res.redirect('/users');
    });

module.exports = router;
