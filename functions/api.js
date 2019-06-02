const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('../server/api')();
const linesRoute = require('../server/routes/lines');
const linesSpTransRoute = require('../server/routes/linesSpTrans');
const { success, error } = require('../server/utils');

const BASE_PATH = process.env.environment !== 'production'
  ? '/api'
  : '/.netlify/functions/api';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/searchLines/:term', async (req, res) => {
  const lines = await api
    .searchBusLine(req.params.term)
    .catch(e => res.json(error(e.message)));
  res.json(success(lines));
});

router.use('/lines', linesRoute);
router.use('/linesSpTrans', linesSpTransRoute);

app.use(BASE_PATH, router);

module.exports = app;
module.exports.handler = serverless(app);
