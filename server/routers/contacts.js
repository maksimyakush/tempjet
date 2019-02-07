const express = require('express');
const Contact = require('../models/contactModel');

const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const contact = new Contact(req.body);
    contact.save((err, contact) => {
        console.log(contact)
        
    })
    const uploadPath = path.join(__dirname, '../files');
    console.log(req.files);

    let upload = req.files.upload;
    upload.mv(path.join(uploadPath, upload.name));
    res.send({files: 'files'});
});

module.exports = router;
