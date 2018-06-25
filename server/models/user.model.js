var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

// Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

var UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, lowercase: true, required: true, unique: true, validate: usernameValidator },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, lowercase: true }, //validate: emailValidator },
    phone: { type: Number },
    active: { type: Boolean, required: true, default: false },
    userid: { type: Number, required: true },
    streetaddress: String,
    city: String,
    state: String,
    publicnotes: String,
    adminnotes: String,
    resettoken: { type: String, required: false },
    permission: { type: String, required: true, default: 'Customer' }
});


module.exports = mongoose.model('User', UserSchema);