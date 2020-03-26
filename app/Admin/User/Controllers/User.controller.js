const moment = require('moment');
const knex = require('../../../../database/knex');
// render
const usersRender = async (req, res) => {
    const users = await knex('users').select('*');
    return res.render('users', { title: 'Users', users: users, moment });
};

// method

const userView = async (req, res) => {
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
};
const userEdit = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.user_id,
        })
        .update({
            fullname: req.body.fullname,
            username: req.body.username,
        });
    return res.redirect('/users');
};

const userDelete = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.user_id,
        })
        .delete();
    console.log(users);
    return res.redirect('/users');
};
module.exports = {
    usersRender,
    userView,
    userEdit,
    userDelete,
};
