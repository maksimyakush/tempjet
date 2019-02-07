const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    FirstName: String,
    LastName: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;