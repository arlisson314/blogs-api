const error = require('./errorMiddleware');
const rescue = require('./rescue');
const authToken = require('./validateToken');
const validationUser = require('./validateUser');
const validatePost = require('./validatePost');

module.exports = { error, rescue, authToken, validationUser, validatePost };