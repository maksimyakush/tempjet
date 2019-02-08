const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const filesRouter = require('./routers/files');
const contactsRouter = require('./routers/contacts');
const statusesRouter = require('./routers/statuses');

mongoose.connect('mongodb://maksim:maksim1@ds017776.mlab.com:17776/webix', {useNewUrlParser: true});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());

app.use('/server/files/', filesRouter);
app.use('/server/contacts/', contactsRouter);
app.use('/server/statuses/', statusesRouter);

app.listen(3000, () => console.log('listen on port 3000'));
