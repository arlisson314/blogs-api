const categoriesService = require('../services/CategoriesService');

const addCategorie = async (req, res) => {
  const { code, data } = await categoriesService.addCategorie(req.body);
  return res.status(code).json(data);
};

const getCategories = async (req, res) => {
  const { code, data } = await categoriesService.getCategories(req.body);
  return res.status(code).json(data);
};

module.exports = { addCategorie, getCategories };