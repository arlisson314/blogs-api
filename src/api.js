const express = require('express');
const midd = require('./middlewares');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const CategoriesController = require('./controllers/CategoriesController');
const PostController = require('./controllers/PostController');

const app = express();
app.use(express.json());

app.post('/login', midd.rescue(LoginController.login));
app.get('/user', midd.authToken, midd.rescue(UserController.getUsers));
app.get('/user/:id', midd.authToken, midd.rescue(UserController.getUsersById));
app.post('/user', midd.validationUser, midd.rescue(UserController.createUser));

app.post('/categories', midd.authToken, midd.rescue(CategoriesController.addCategorie));
app.get('/categories', midd.authToken, midd.rescue(CategoriesController.getCategories));

app.post('/post', midd.authToken, midd.validatePost, midd.rescue(PostController.addPost));
app.get('/post', midd.authToken, midd.rescue(PostController.getPost));
app.get('/post/:id', midd.authToken, midd.rescue(PostController.getPostById));
app.put('/post/:id', midd.authToken, midd.rescue(PostController.updatePost));
app.delete('/post/:id', midd.authToken, midd.rescue(PostController.deletePost));
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use(midd.error);

module.exports = app;
