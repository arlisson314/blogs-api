const PostService = require('../services/PostService');

const verifyCategory = async (req, res) => {
  const { authorization: token } = req.headers;

  const verify = await PostService.verifyCategory(req.body.categoryIds);
  if (verify.message) return res.status(400).json(verify);
  if (verify) {
    const { code, data } = await PostService.addPost(req.body, token);
    return res.status(code).json(data);
  } 
};

module.exports = { verifyCategory };