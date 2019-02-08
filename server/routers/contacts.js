const express = require('express');
const Contact = require('../models/contactModel');
const File = require('../models/fileModel');

const router = express.Router();

router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    console.log(req.body)
    contact.save((err, contact) => {
        const { FirstName, LastName } = contact;
        res.send({
            status: 200,
            id: contact._id,
            FirstName,
            LastName
        });
    });
});

module.exports = router;
