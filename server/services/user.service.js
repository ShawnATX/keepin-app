var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Q = require('q');

mongoose.connect(config.connectionString);
var db = mongoose.connection;
var User = require('../models/user.model');
console.log(User);
// db.on('error', console.rror.bind(console, 'connection error:'));
// db.once('open', function() { // we're connected!});

var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;


function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                userid: user.userid,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user.userid }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {

}

function getById(userid) {

}

function create(userParams) {
    console.log(userParams);
    var deferred = Q.defer();

 
    // validation
    User.findOne(
        { username: userParams.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (user) {
                // username already exists
                deferred.reject('Username "' + userParams.username + '" is already taken');
            } else {
                createUser();
            }
        });
    
    function createUser() {
        // set user object to userParam without the cleartext password
        var cleanUser = _.omit(userParams, 'password');
        // add hashed password to user object
        cleanUser.password = bcrypt.hashSync(userParams.password, 10);
        var newUser = new User(cleanUser)
        newUser.save(function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }
    return deferred.promise;
}

function update(userid, userParam) {

}

function _delete(userid) {

}