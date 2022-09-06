const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const tokenGenerate = require('./TokenService');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });
  const token = tokenGenerate(email);
  return { code: 201, data: { token } };
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { code: 200, data: users }; 
};

const getUsersById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
  return { code: 404, data: { message: 'User does not exist' } }; 
}
  return { code: 200, data: user };
};

const deleteUser = async ({ authorization: token }) => {
  // const user = await User.findByPk();
  
  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const [user] = await User.findAll({ where: { email } });
//  console.log(user.id);
  await user.destroy();
  return { code: 204 };
};

module.exports = { createUser, getUsers, getUsersById, deleteUser };
