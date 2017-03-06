const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(express.static('videos'));
routes(app);

/* Middleware pour les erreurs */
app.use((err, req, res, next) => {
  console.log(err)
  res.status(422).send({ error: err.message });
});

module.exports = app;
