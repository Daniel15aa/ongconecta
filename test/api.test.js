const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let base;

test.before(() => new Promise((resolve) => {
  server = app.listen(0, () => {
    base = `http://127.0.0.1:${server.address().port}`;
    resolve();
  });
}));
test.after(() => server.close());

const postar = (corpo) => fetch(`${base}/api/inscricoes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(corpo),
});

test('GET /health', async () => {
  const r = await fetch(`${base}/health`);
  assert.strictEqual(r.status, 200);
});

test('GET /api/ongs lista e filtra', async () => {
  const todas = await (await fetch(`${base}/api/ongs`)).json();
  const filtradas = await (await fetch(`${base}/api/ongs?area=Cultura`)).json();
  assert.ok(todas.length > filtradas.length);
  assert.strictEqual(filtradas[0].nome, 'Cena Aberta');
});

test('GET /api/ongs/:id retorna 404 quando não existe', async () => {
  const r = await fetch(`${base}/api/ongs/999`);
  assert.strictEqual(r.status, 404);
});

test('POST /api/inscricoes cria com 201', async () => {
  const r = await postar({ ongId: 3, nome: 'Carlos Lima', email: 'carlos@exemplo.com' });
  assert.strictEqual(r.status, 201);
  assert.strictEqual((await r.json()).organizacao, 'Rio Limpo');
});

test('POST /api/inscricoes rejeita dados inválidos com 422', async () => {
  const r = await postar({ ongId: 3, nome: '', email: 'invalido' });
  assert.strictEqual(r.status, 422);
  const { erros } = await r.json();
  assert.ok(erros.nome && erros.email);
});

test('rota inexistente em /api retorna 404 em JSON', async () => {
  const r = await fetch(`${base}/api/nada`);
  assert.strictEqual(r.status, 404);
  assert.ok((await r.json()).erro);
});
