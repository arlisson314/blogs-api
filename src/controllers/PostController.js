const PostService = require('../services/PostService');

/** @type {import('express').RequestHandler} */
const verifyCategory = async (req, res) => {
  const verify = await PostService.verifyCategory(req.body.categoryIds);

  if (verify.message) return res.status(400).json(verify);

  if (verify) {
    const { code, data } = await PostService.addPost(req.body,
      req.headers.authorization);
    return res.status(code).json(data);
  } 
};

/** @type {import('express').RequestHandler} */
const getPost = async (_req, res) => {
  const { code, data } = await PostService.getPost();
  return res.status(code).json(data);
};

module.exports = { verifyCategory, getPost };