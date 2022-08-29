const loginService = require('../services/LoginService');

  const generateToken = async (req, res) => {
    const { code, data } = await loginService.generateToken(req.body);
    return res.status(code).json(data);
  };

module.exports = { generateToken };