const categoriesService = require('../services/CategoriesService');

const addCategorie = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const { code, data } = await categoriesService.addCategorie(req.body);
  return res.status(code).json(data);
};

module.exports = { addCategorie };