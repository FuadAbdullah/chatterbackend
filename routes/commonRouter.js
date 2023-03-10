const express = require('express');
const { getTestAPI } = require('../controllers/commonController.js');

const router = express.Router();

router.get('/test', getTestAPI);

module.exports = router;