const { Router } = require('express');
const ongs = require('../services/ongs');

const router = Router();

router.get('/areas', (_req, res) => res.json(ongs.areas()));

router.get('/ongs', (req, res) => {
  res.json(ongs.listar({ area: req.query.area, q: req.query.q }));
});

router.get('/ongs/:id', (req, res) => {
  const ong = ongs.buscar(Number(req.params.id));
  if (!ong) return res.status(404).json({ erro: 'Organização não encontrada.' });
  res.json(ong);
});

module.exports = router;
