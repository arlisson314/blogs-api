const express = require('express');
const rescue = require('./middlewares/rescue');
const UserUserController = require('./controllers/LoginController');
const middError = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.post('/login', rescue(UserUserController.createLogin));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use(middError);
module.exports = app;
