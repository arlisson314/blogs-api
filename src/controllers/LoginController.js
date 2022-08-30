const loginService = require('../services/LoginService');

  const login = async (req, res) => {
    const { code, data } = await loginService.login(req.body);
    return res.status(code).json(data);
  };

module.exports = { login };