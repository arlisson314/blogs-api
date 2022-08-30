const error = require('./errorMiddleware');
const rescue = require('./rescue');
const authToken = require('./validateToken');
const validationUser = require('./validateUser');

module.exports = { error, rescue, authToken, validationUser };