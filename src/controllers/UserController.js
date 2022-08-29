const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { code, data } = await UserService.createUser(req.body);
  return res.status(code).json(data);
};

module.exports = { createUser };