const path = require('path');
const express = require('express');
const ongsRoutes = require('./routes/ongs');
const inscricoesRoutes = require('./routes/inscricoes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', ongsRoutes);
app.use('/api', inscricoesRoutes);

app.use('/api', (_req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ erro: status === 500 ? 'Erro interno.' : 'Requisição inválida.' });
});

module.exports = app;
