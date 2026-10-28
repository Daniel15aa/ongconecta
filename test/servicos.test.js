const test = require('node:test');
const assert = require('node:assert');
const ongs = require('../src/services/ongs');
const inscricoes = require('../src/services/inscricoes');

test.beforeEach(() => inscricoes.limpar());

test('listar filtra por área', () => {
  const resultado = ongs.listar({ area: 'Animais' });
  assert.ok(resultado.length > 0);
  assert.ok(resultado.every((o) => o.area === 'Animais'));
});

test('listar busca ignorando acentos e maiúsculas', () => {
  assert.strictEqual(ongs.listar({ q: 'REFORCO' }).length, 1);
  assert.strictEqual(ongs.listar({ q: 'reforço' }).length, 1);
});

test('buscar retorna null para id inexistente', () => {
  assert.strictEqual(ongs.buscar(999), null);
});

test('criar inscrição válida', () => {
  const { inscricao, erros } = inscricoes.criar({
    ongId: 1, nome: ' Maria Souza ', email: 'MARIA@exemplo.com',
  });
  assert.strictEqual(erros, undefined);
  assert.strictEqual(inscricao.nome, 'Maria Souza');
  assert.strictEqual(inscricao.email, 'maria@exemplo.com');
  assert.strictEqual(inscricoes.total(), 1);
});

test('criar inscrição inválida retorna erros por campo', () => {
  const { erros } = inscricoes.criar({ ongId: 99, nome: 'Jo', email: 'x' });
  assert.deepStrictEqual(Object.keys(erros).sort(), ['email', 'nome', 'ongId']);
  assert.strictEqual(inscricoes.total(), 0);
});
