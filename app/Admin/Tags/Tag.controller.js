const knex = require('../../../database/knex');
const slugify = require('slugify');
const tagsRender = async (req, res) => {
    console.log(await knex('tags').select('*'));
    return res.render('admin/pages/tags', {
        title: ' Tags',
        usernow: req.session.user,
        tags: await knex('tags').select('*'),
    });
};

const tagEdit = async (req, res) => {
    const { tag_name } = req.body;
    const onlytag = await knex('tags')
        .where({ tag_name: tag_name })
        .select('*');
    if (onlytag.length !== 0) {
        return res.redirect('/admin/tags');
    }
    if (onlytag.length == 0) {
        await knex('tags')
            .where({
                tag_id: req.params.id,
            })
            .update({
                tag_name: tag_name,
            });
        return res.redirect('/admin/tags');
    }
};
const tagDelete = async (req, res) => {
    await knex('tags')
        .where({
            tag_id: req.params.id,
        })
        .delete();
    console.log('deleted');
    return res.redirect('/admin/tags');
};
module.exports = {
    tagEdit,
    tagDelete,
    tagsRender,
};
