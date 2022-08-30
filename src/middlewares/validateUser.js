const Joi = require('joi');
const { User } = require('../database/models');

const validation = async (req, res, next) => {
  // valida displayName, email e password
  const { displayName, email, password } = req.body;
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate({ displayName, email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  // valida se ja existe o emal cadastrado no banco de dados
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) {
  return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = { validation };

// const error = new Error('Token not found');
// error.statusCode = 401;
// if (!token) throw error;