const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const screenshotSchema = new Schema( {
    sceneName: String,
    image: Buffer,  
});

const Screenshot = mongoose.model('screenshot', screenshotSchema, 'screenshots');

module.exports = Screenshot;