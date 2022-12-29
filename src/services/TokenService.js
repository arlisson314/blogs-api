const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerate = (email, id) => {
  const PAYLOAD = { email, id, admin: false };
  const { JWT_SECRET } = process.env;
  const CONFIG = { expiresIn: '7d' };
  const token = jwt.sign(PAYLOAD, JWT_SECRET, CONFIG);
  return token;
};

module.exports = tokenGenerate;