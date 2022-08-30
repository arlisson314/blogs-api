const { Category } = require('../database/models');

const addCategorie = async ({ name }) => {
  if (!name) return { code: 400, data: { message: '"name" is required' } };

  const newCategorie = await Category.create({ name });
  console.log(newCategorie);

  return { code: 201, data: newCategorie };
};

module.exports = { addCategorie };