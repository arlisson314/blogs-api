const jwt = require('jsonwebtoken');
const { Category, User, BlogPost, PostCategory, sequelize } = require('../database/models');
 
const verifyCategory = async (categoryIds) => {
  const check = await Category.findAndCountAll({ where: { id: categoryIds } });
 
  if (check.count !== categoryIds.length) { 
    return { message: '"categoryIds" not found' }; 
  }
  return true;
};

const addPost = async ({ title, content, categoryIds }, token) => {
  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { email } });

  const result = await sequelize.transaction(
    async (t) => {
    const newPost = await BlogPost.create({ title, content, userId: user.id },
      { transaction: t });
    
    const categories = categoryIds.map((id) => ({
      postId: newPost.id, categoryId: id }
    ));
  
    await PostCategory.bulkCreate(categories,
      { transaction: t });
  
    return { code: 201, data: newPost };
  },
);
  return result;
};

module.exports = { verifyCategory, addPost };