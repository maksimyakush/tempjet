const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    FileName: String,
    FileSize: String,
    ContactID: Number
});
const File = mongoose.model('File', FileSchema);

module.exports = File;
