const express = require('express');
const File = require('../models/fileModel');

const router = express.Router();
const path = require('path');

// router.get('/', async (req, res) => {
//     const files = await File.remove();
//     res.send(files);
// });

router.post('/', async (req, res) => {
    const {contactId} = req.body;
    const uploadPath = path.join(__dirname, '../files');
    if (req.files) {
        const {upload} = req.files;
        upload.mv(path.join(uploadPath, upload.name));
        const file = new File({contactId, name: upload.name});
        file.save((err, file) => {
            res.send({
                status: 'server',
                id: file._id
            });
        });
    }
});


router.get('/:id', async (req, res) => {
    const files = await File.find({contactId: req.params.id});
    // const q = await File.find();
    console.log(files)
    res.send(files)
    // const {contactId} = req.body;
    // const uploadPath = path.join(__dirname, '../files');
    // if (req.files) {
    //     const {upload} = req.files;
    //     upload.mv(path.join(uploadPath, upload.name));
    //     const file = new File({contactId, name: upload.name});
    //     file.save((err, file) => {
    //         res.send({
    //             status: 'server',
    //             id: file._id
    //         });
    //     });
    // }
});

module.exports = router;
