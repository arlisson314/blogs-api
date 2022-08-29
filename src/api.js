const express = require('express');
const rescue = require('./middlewares/rescue');
const LoginController = require('./controllers/LoginController');
const middError = require('./middlewares/errorMiddleware');
const UserController = require('./controllers/UserController');

const { validation } = require('./middlewares/validateUser');

const app = express();
app.use(express.json());

app.post('/login', rescue(LoginController.generateToken));
app.post('/user',
validation,
rescue(UserController.createUser));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use(middError);

module.exports = app;
