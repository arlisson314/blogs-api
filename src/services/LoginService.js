const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

  const creatLogin = async ({ email, password }) => {
    if (!email || !password) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }
    
    const user = await User.findOne({
      where: { email, password }, 
    });
    if (!user) {
      return { code: 400, data: { message: 'Invalid fields' } };
    }
    const payload = { email };
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(payload, JWT_SECRET);
    return { code: 200, data: { token } };
  };
  
module.exports = { creatLogin };
