const PostService = require('../services/PostService');

/** @type {import('express').RequestHandler} */
const addPost = async (req, res) => {
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

/** @type {import('express').RequestHandler} */
const getPostById = async (req, res) => {
  const { code, data } = await PostService.getPostById(req.params);
  return res.status(code).json(data);
};

module.exports = { addPost, getPost, getPostById };