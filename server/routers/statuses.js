const express = require('express');
const Status = require('../models/statusModel');

const router = express.Router();

router.get('/', async (req, res) => {
    const statuses = await Status.find();
    res.send(statuses);
});

module.exports = router;
