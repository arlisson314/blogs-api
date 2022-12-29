const UserService = require('../services/UserService');

/** @type {import('express').RequestHandler} */
const createUser = async (req, res) => {
  const { code, data } = await UserService.createUser(req.body);
  return res.status(code).json(data);
};

/** @type {import('express').RequestHandler} */
const getUsers = async (_req, res) => {
  const { code, data } = await UserService.getUsers();
  return res.status(code).json(data);
};

/** @type {import('express').RequestHandler} */
const getUsersById = async (req, res) => {
  const { code, data } = await UserService.getUsersById(req.params.id);
  return res.status(code).json(data);
};

/** @type {import('express').RequestHandler} */
const deleteUser = async (req, res) => {
  const { code } = await UserService.deleteUser(req.headers);
  return res.status(code).end();
};

module.exports = { createUser, getUsers, getUsersById, deleteUser };