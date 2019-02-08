const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    value: String,
});
const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;