const { Router } = require('express');
const inscricoes = require('../services/inscricoes');

const router = Router();

router.post('/inscricoes', (req, res) => {
  const { erros, inscricao, ong } = inscricoes.criar(req.body || {});
  if (erros) return res.status(422).json({ erros });
  res.status(201).json({ id: inscricao.id, organizacao: ong.nome });
});

module.exports = router;
