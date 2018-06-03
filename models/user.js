var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = require('./messageSchema.js');

const UsersSchema = new Schema({
    name: {
		type: String,
		require: true,
	},
	password: {
        type: String,
        require: true,
    },
    email: { 
		type: String,
		unique: true,
		require: true,
	},
	inbox : { 
		type: [Message],
		default: []
	},
	outbox : { 
		type: [Message],
		default: []
	}
});

UsersSchema.methods.verifyPasswd = function(passwd, cb){
    return this.password == passwd
}

module.exports = mongoose.model('User', UsersSchema);
