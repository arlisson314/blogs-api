const tokenGenerate = require('./TokenService');
const { User } = require('../database/models');

  const login = async ({ email, password }) => {
    if (!email || !password) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }
    
    const user = await User.findOne({
      where: { email, password }, 
    });
    if (!user) {
      return { code: 400, data: { message: 'Invalid fields' } };
    }

    const token = tokenGenerate(email, user.id);
    
    return { code: 200, data: { token } };
  };
  
module.exports = { login };
