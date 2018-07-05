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
               deferred.resolve(user);
            }
        });    
    return deferred.promise;
};

function create(userParams) {
    var deferred = Q.defer();
    // check if user already exists
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
    var deferred = Q.defer();
    User.findOne(
        { userid: userid },
        function (err, user) { 
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (!user) {
                // user does not exist
                deferred.reject('User ID ' + userid + ' does not exist');
            } else {
                user = updateUser(user);
                user.save();
                deferred.resolve();
            }
        });

  function updateUser(user){
    if (userParam.firstname) user.firstname = userParam.firstname; // Check if a change to name was requested
    if (userParam.lastname) user.lastname = userParam.lastname; // Check if a change to name was requested
    if (userParam.username) user.usesrname = userParam.username; // Check if a change to username was requested
    if (userParam.email) user.email = userParam.email; // Check if a change to e-mail was requested
    if (userParam.phone) user.phone = userParam.phone; //  Check if a change to e-mail was requested
    if (userParam.active) user.active = userParam.active; //  Check if a change to e-mail was requested
    if (userParam.streetaddress) user.streetaddress = userParam.streetaddress; //  Check if a change to e-mail was requested
    if (userParam.city) user.city = userParam.city; //  Check if a change to e-mail was requested
    if (userParam.state) user.state = userParam.state; //  Check if a change to e-mail was requested
    if (userParam.publicnotes) user.publicnotes = userParam.publicnotes; //  Check if a change to e-mail was requested
    if (userParam.adminnotes) user.adminnotes = userParam.Adminnotes; //  Check if a change to e-mail was requested
    if (userParam.permission) user.permission = userParam.permission; // Check if a change to permission was requested
    return user;  
  };
  
  return deferred.promise;
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
    deferred.resolve(_id);
  }); 
  return deferred.promise;
}
