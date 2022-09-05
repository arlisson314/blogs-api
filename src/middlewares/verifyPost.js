const { BlogPost } = require('../database/models');

const verifyPost = async (req, res, next) => {
  const { id } = req.params;
  // const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({ message: 'Some required fields are missing' }); 
//  }

  const verify = await BlogPost.findByPk(id);
  if (!verify) return res.status(400).json({ message: 'Post does not exist' }); 
  next();
};

module.exports = verifyPost;