const { User } = require('../database/models');
const loginService = require('./LoginService');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });
  const { data } = await loginService.login({ email, password });
  return { code: 201, data };
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { code: 200, data: users }; 
};

module.exports = { createUser, getUsers };
