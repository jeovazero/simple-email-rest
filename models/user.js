var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = require('./messageSchema.js');

const UsersSchema = new Schema({
    name: {
		type: String,
		require: true,
	},
    email: { 
		type: String,
		unique: true,
		require: true,
	},
    password: {
        type: String,
        require: true,
    },
	inbox : [Message],
	outbox : [Message]
});

UsersSchema.methods.verifyPasswd = function(cb){
    return true;
}

module.exports = mongoose.model('User', UsersSchema);
