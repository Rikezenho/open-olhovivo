const express = require('express');
const router = express.Router();
const { error, success } = require('../utils');
const api = require('../api')();

router.get('/', (req, res) => res.json(error('Please specify a route!')));

router.get('/:line/schedule', async (req, res) => {
  const lineId = req.params.line;
  const schedule = await api.getLineSchedule(lineId);

  res.json(success(schedule));
});

router.get('/:line/position', async (req, res) => {
  const lineId = req.params.line;
  const position = await api.getLinePosition(lineId);

  res.json(success(position));
});

router.get('/:lineNumber/route/:direction', async (req, res) => {
  const { lineNumber, direction } = req.params;
  const route = await api.getLineRoute(lineNumber, direction);

  res.json(success(route));
});

module.exports = router;
