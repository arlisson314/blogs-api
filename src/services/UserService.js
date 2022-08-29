const { User } = require('../database/models');
const loginService = require('./LoginService');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });
  const { data } = await loginService.generateToken({ email, password });
  return { code: 201, data };
};

module.exports = { createUser };
