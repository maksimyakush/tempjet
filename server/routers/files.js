const express = require('express');
const File = require('../models/fileModel');

const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const files = await File.find();
    res.send(files);
});

router.post('/', async (req, res) => {
    const uploadPath = path.join(__dirname, '../files');
    console.log(req.body)
    let upload = req.files.upload;
    upload.mv(path.join(uploadPath, upload.name));
    res.send({files: 'files'});
});

module.exports = router;
