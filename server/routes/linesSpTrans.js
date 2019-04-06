const express = require('express');
const router = express.Router();
const { error, success } = require('../utils');
const api = require('../api')();

router.get('/', (req, res) => res.json(error('Please specify a route!')));

router.get('/:lineNumber/route/:direction', async (req, res) => {
  const { lineNumber, direction } = req.params;
  const route = await api.getLineRoute(lineNumber, direction);

  res.json(success(route));
});

module.exports = router;
