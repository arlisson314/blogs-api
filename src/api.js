const express = require('express');
const rescue = require('./middlewares/rescue');
const LoginController = require('./controllers/LoginController');
const middError = require('./middlewares/errorMiddleware');
const UserController = require('./controllers/UserController');

const { validation } = require('./middlewares/validateUser');
const { authToken } = require('./middlewares/validateToken');

const app = express();
app.use(express.json());

app.post('/login', rescue(LoginController.generateToken));
app.post('/user', validation, rescue(UserController.createUser));
app.get('/user', authToken, rescue(UserController.getUsers));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use(middError);

module.exports = app;
