const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

  const generateToken = async ({ email, password }) => {
    if (!email || !password) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }
    
    const user = await User.findOne({
      where: { email, password }, 
    });
    
    if (!user) {
      return { code: 400, data: { message: 'Invalid fields' } };
    }
    const PAYLOAD = { email };

    const { JWT_SECRET } = process.env;

    const CONFIG = { expiresIn: '7d' };
    const token = jwt.sign(PAYLOAD, JWT_SECRET, CONFIG);
    
    return { code: 200, data: { token } };
  };
  
module.exports = { generateToken };
