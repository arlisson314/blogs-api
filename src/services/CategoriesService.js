const { Category } = require('../database/models');

const addCategorie = async ({ name }) => {
  if (!name) return { code: 400, data: { message: '"name" is required' } };

  const newCategorie = await Category.create({ name });
  console.log(newCategorie);

  return { code: 201, data: newCategorie };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return { code: 200, data: categories };
};

module.exports = { addCategorie, getCategories };