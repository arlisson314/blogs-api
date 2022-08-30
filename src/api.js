const express = require('express');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const midd = require('./middlewares');

const app = express();
app.use(express.json());

app.post('/login', midd.rescue(LoginController.login));
app.get('/user', midd.authToken, midd.rescue(UserController.getUsers));
app.get('/user/:id', midd.authToken, midd.rescue(UserController.getUsersById));
app.post('/user', midd.validationUser, midd.rescue(UserController.createUser));

app.post('/categories', midd.validationUser, midd.rescue());

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use(midd.error);

module.exports = app;
