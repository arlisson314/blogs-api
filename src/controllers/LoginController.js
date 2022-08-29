const loginUserService = require('../services/LoginService');

  const createLogin = async (req, res) => {
    const { email, password } = req.body;
    const { code, data } = await loginUserService.creatLogin({ email, password });
    res.status(code).json(data);
  };

module.exports = { createLogin };