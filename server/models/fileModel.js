const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    name: String,
    contactId: String
});
const File = mongoose.model('File', FileSchema);

module.exports = File;
