var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Q = require('q');
mongoose.connect(config.connectionString);
var db = mongoose.connection;
var User = require('../models/user.model');
var service = {};
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;


function getObjId(userid){
  
}

function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        
        if (user && bcrypt.compare(password, user.passhash)) {
          console.log(user.firstName + user.userid);
          // authentication successful
          deferred.resolve({
            userid: user.userid,
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            token: jwt.sign({ sub: user.userid }, config.secret)
          });
        };
      return deferred.promise;
    });
  return deferred.promise;
};

function getAll() {

}

function getById(userid) {
    var deferred = Q.defer();

    User.findOne(
        { userid: userid },
        function (err, user){
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (user) {
               var _id = user._id;
               console.log(_id);
               deferred.resolve(user._id);
            }
        });    
    return deferred.promise;
};

function create(userParams) {
    var deferred = Q.defer();
    // check if user already exists
    User.findOne(
        { username: userParams.username },
        function (err, user) {  1
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
        var salt = bcrypt.genSaltSync(10);
        var cleanUser = _.omit(userParams, 'password');
        // add hashed password to user object
        cleanUser.passhash = bcrypt.hashSync(userParams.password, salt);
        var newUser = new User(cleanUser)
        console.log('newUser.passhash');
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
  var deferred = Q.defer();
  var _id;
  getById(userid)
    .then(function () {
      _id = res.body._id;
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
  console.log(_id);
  User.deleteOne( { userid: userid }, function (err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  }); 
  return deferred.promise;
}
