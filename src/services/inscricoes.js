const ongs = require('./ongs');

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inscricoes = [];

function criar({ ongId, nome, email, mensagem }) {
  const erros = {};
  const ong = ongs.buscar(Number(ongId));

  if (!ong) erros.ongId = 'Escolha uma organização da lista.';
  if (!nome || nome.trim().length < 3) erros.nome = 'Informe seu nome completo.';
  if (!email || !EMAIL.test(email.trim())) erros.email = 'Informe um e-mail válido.';
  if (mensagem && mensagem.length > 500) erros.mensagem = 'A mensagem pode ter até 500 caracteres.';
  if (Object.keys(erros).length > 0) return { erros };

  const inscricao = {
    id: inscricoes.length + 1,
    ongId: ong.id,
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    mensagem: (mensagem || '').trim(),
    criadaEm: new Date().toISOString(),
  };
  inscricoes.push(inscricao);
  return { inscricao, ong };
}

function total() {
  return inscricoes.length;
}

function limpar() {
  inscricoes.length = 0;
}

module.exports = { criar, total, limpar };
