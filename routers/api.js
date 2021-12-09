const express = require('express');
const router = express();
const { getUsersDb } = require('../controller/api');

// router.get('/information', getInfo);
router.get('/users', getUsersDb);

module.exports = router;
