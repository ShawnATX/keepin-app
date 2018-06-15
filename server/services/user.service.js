var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;


function authenticate(username, password) {

}

function getAll() {

}

function getById(_id) {

}

function create(userParam) {

}

function update(_id, userParam) {

}

function _delete(_id) {

}