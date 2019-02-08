const express = require('express');
const File = require('../models/fileModel');

const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const files = await File.find();
    res.send(files);
});

router.post('/', async (req, res) => {
    const { contactId, name } = req.body
    const uploadPath = path.join(__dirname, `../files`);

    if(req.files) {
        const {upload} = req.files;
        upload.mv(path.join(uploadPath, upload.name));
        console.log({contactId, name: upload.name});

    }
    const file = new File({contactId, name});
    file.save((err, file) => {
        console.log(file);
        res.send({
            status: "server",
            id: file._id
        });
    });
});

module.exports = router;
