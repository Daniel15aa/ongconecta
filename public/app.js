const $ = (seletor) => document.querySelector(seletor);
const filtro = { area: '', q: '' };
let ongs = [];

async function api(url, opcoes) {
  const resposta = await fetch(url, opcoes);
  const corpo = await resposta.json();
  if (!resposta.ok) throw Object.assign(new Error('Falha na requisição'), { corpo });
  return corpo;
}

function criar(tag, atributos = {}, texto = '') {
  const el = document.createElement(tag);
  Object.assign(el, atributos);
  if (texto) el.textContent = texto;
  return el;
}

function renderizarLista(itens) {
  const lista = $('#lista');
  lista.replaceChildren();

  if (itens.length === 0) {
    lista.append(criar('li', { className: 'vazio' }, 'Nenhuma organização encontrada para esse filtro.'));
    return;
  }

  for (const ong of itens) {
    const li = criar('li', { className: 'ong' });

    const titulo = criar('div');
    titulo.append(criar('h3', {}, ong.nome), criar('p', { className: 'meta' }, `${ong.area} · ${ong.bairro}`));

    const acao = criar('div', { className: 'acao' });
    const botao = criar('button', { className: 'link', type: 'button' }, 'Quero ajudar');
    botao.addEventListener('click', () => escolherOng(ong.id));
    acao.append(criar('span', { className: 'vagas' }, `${ong.vagas} ${ong.vagas === 1 ? 'vaga' : 'vagas'}`), botao);

    li.append(titulo, criar('p', {}, ong.descricao), acao);
    lista.append(li);
  }
}

function renderizarAreas(areas) {
  const container = $('#areas');
  for (const area of ['', ...areas]) {
    const botao = criar('button', { type: 'button' }, area || 'Todas');
    botao.setAttribute('aria-pressed', String(area === filtro.area));
    botao.addEventListener('click', () => {
      filtro.area = area;
      container.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
      carregar();
    });
    container.append(botao);
  }
}

function escolherOng(id) {
  $('#form [name="ongId"]').value = String(id);
  $('#inscricao').scrollIntoView();
  $('#form [name="nome"]').focus({ preventScroll: true });
}

async function carregar() {
  const params = new URLSearchParams();
  if (filtro.area) params.set('area', filtro.area);
  if (filtro.q) params.set('q', filtro.q);
  renderizarLista(await api(`/api/ongs?${params}`));
}

async function iniciar() {
  const [todas, areas] = await Promise.all([api('/api/ongs'), api('/api/areas')]);
  ongs = todas;

  $('#num-ongs').textContent = todas.length;
  $('#num-vagas').textContent = todas.reduce((soma, o) => soma + o.vagas, 0);
  $('#num-areas').textContent = areas.length;

  const select = $('#form [name="ongId"]');
  select.append(criar('option', { value: '' }, 'Selecione…'));
  for (const ong of todas) select.append(criar('option', { value: ong.id }, ong.nome));

  renderizarAreas(areas);
  renderizarLista(todas);
}

let espera;
$('#busca').addEventListener('input', (evento) => {
  clearTimeout(espera);
  espera = setTimeout(() => { filtro.q = evento.target.value.trim(); carregar(); }, 250);
});

$('#form').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = evento.target;
  const botao = form.querySelector('button');
  const retorno = $('#retorno');

  form.querySelectorAll('[data-erro]').forEach((el) => { el.textContent = ''; });
  retorno.textContent = '';
  botao.disabled = true;

  try {
    const dados = Object.fromEntries(new FormData(form));
    const resultado = await api('/api/inscricoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    retorno.textContent = `Inscrição enviada para ${resultado.organizacao}. Obrigado por se voluntariar.`;
    form.reset();
  } catch (erro) {
    const erros = erro.corpo && erro.corpo.erros;
    if (erros) {
      for (const [campo, mensagem] of Object.entries(erros)) {
        const alvo = form.querySelector(`[data-erro="${campo}"]`);
        if (alvo) alvo.textContent = mensagem;
      }
    } else {
      retorno.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
    }
  } finally {
    botao.disabled = false;
  }
});

iniciar().catch(() => {
  $('#lista').append(criar('li', { className: 'vazio' }, 'Não foi possível carregar as organizações.'));
});
