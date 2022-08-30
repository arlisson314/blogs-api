const UserService = require('../services/UserService');

// /** @type {import('express').RequestHandler} */
const createUser = async (req, res) => {
  const { code, data } = await UserService.createUser(req.body);
  return res.status(code).json(data);
};

const getUsers = async (req, res) => {
  const { authorization: token } = req.headers;
  const error = new Error('Token not found');
  error.statusCode = 401;
  if (!token) throw error;
  
  const { code, data } = await UserService.getUsers();
  return res.status(code).json(data);
};

module.exports = { createUser, getUsers };