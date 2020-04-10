const moment = require('moment');
const knex = require('../../../../database/knex');

// render
const usersRender = async (req, res) => {
    console.log('user render');
    const users = await knex('users').select('*');
    const usernow = req.session.user;
    return res.render('admin/pages/table', {
        title: 'Users',
        users: users,
        usernow: usernow,
        moment,
    });
};

// method

const userView = async (req, res, Promise) => {
    const usernow = req.session.user;
    const user_view = await knex('users')
        .where({
            id: req.params.id,
        })
        .select('*');
    console.log(user_view);
    return res.render('admin/pages/userprofile', {
        title: 'user',
        users: user_view,
        usernow: usernow,
        moment,
    });
};
const userEdit = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.id,
        })
        .update({
            fullname: req.body.fullname,
            username: req.body.username,
        });
    return res.redirect('/admin/users');
};

const userDelete = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.id,
        })
        .delete();
    return res.redirect('/admin/users');
};
module.exports = {
    usersRender,
    userView,
    userEdit,
    userDelete,
};
