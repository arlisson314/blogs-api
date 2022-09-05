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
  const user = await User.findOne({ where: { email } }); // busca o email do usuario

  const result = await sequelize.transaction(
    async (t) => {
    const newPost = await BlogPost.create({ title, content, userId: user.id },
      { transaction: t });
    
    const categories = categoryIds.map((id) => ({
      postId: newPost.id, categoryId: id }
    ));
  
    await PostCategory.bulkCreate(categories, { transaction: t });
  
    return { code: 201, data: newPost };
  },
);
  return result;
};

const getPost = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { 
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { code: 200, data: posts };
};

const getPostById = async ({ id }) => {
  const getById = await BlogPost.findByPk(id, {
    include: [
      { 
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!getById) return { code: 404, data: { message: 'Post does not exist' } };
  return { code: 200, data: getById };
};

const updatePostById = async ({ id, title, content, authorization: token }) => {
  if (!title || !content) {
    return { code: 400, data: { message: 'Some required fields are missing' } }; 
  }
  const post = await BlogPost.findByPk(id,
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  await post.update({ title, content });

  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { email } }); // busca o email do usuario
  if (user.id !== post.userId) return { code: 401, data: { message: 'Unauthorized user' } }; 

  return { code: 200, data: post };
};

module.exports = { verifyCategory, addPost, getPost, getPostById, updatePostById };