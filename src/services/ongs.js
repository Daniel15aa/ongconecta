const ongs = require('../data/ongs');

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function listar({ area, q } = {}) {
  const termo = q ? normalizar(q) : null;
  return ongs.filter((ong) => {
    if (area && ong.area !== area) return false;
    if (termo && !normalizar(`${ong.nome} ${ong.descricao}`).includes(termo)) return false;
    return true;
  });
}

function buscar(id) {
  return ongs.find((ong) => ong.id === id) || null;
}

function areas() {
  return [...new Set(ongs.map((ong) => ong.area))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

module.exports = { listar, buscar, areas };
