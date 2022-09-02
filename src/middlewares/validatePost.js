const Joi = require('joi');

const verifyPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1).required(),
  });
  const { error } = schema.validate({ title, content, categoryIds });
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  next();
};

module.exports = verifyPost;