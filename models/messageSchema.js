var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: String, 
    to: String,
	subject: String,
	body: String
});

module.exports = MessageSchema;
