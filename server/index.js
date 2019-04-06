const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api')();
const linesRoute = require('./routes/lines');
const { success, error } = require('./utils');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/searchLines/:term', async (req, res) => {
  const lines = await api.searchBusLine(req.params.term).catch(e => res.json(error(e.message)));
  res.json(success(lines));
});

app.use('/lines', linesRoute);

app.listen(3000, () => {
  console.log('API is running...');
});
