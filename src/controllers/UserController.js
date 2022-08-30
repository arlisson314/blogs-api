const UserService = require('../services/UserService');

// /** @type {import('express').RequestHandler} */
const createUser = async (req, res) => {
  const { code, data } = await UserService.createUser(req.body);
  return res.status(code).json(data);
};

const getUsers = async (_req, res) => {
  const { code, data } = await UserService.getUsers();
  return res.status(code).json(data);
};

const getUsersById = async (req, res) => {
  const { code, data } = await UserService.getUsersById(req.params.id);
  return res.status(code).json(data);
};

module.exports = { createUser, getUsers, getUsersById };