const express = require('express');
const router = express.Router();
const { productsRender } = require('../app/Client/Controllers');

router.get('/shop', productsRender);
module.exports = router;
