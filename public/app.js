const ongsData = [
  {
    id: 1,
    nome: "Rio Limpo Joinville",
    categoria: "Meio Ambiente",
    bairro: "Pirabeiraba",
    vagas: 10,
    descricao: "Mutirões mensais de limpeza das margens do Rio Cachoeira e plantio de mudas nativas."
  },
  {
    id: 2,
    nome: "Mãos que Acolhem",
    categoria: "Assistência Social",
    bairro: "Centro",
    vagas: 8,
    descricao: "Preparo e distribuição de refeições para pessoas em situação de rua e apoio com agasalhos."
  },
  {
    id: 3,
    nome: "Ler para Crescer",
    categoria: "Educação",
    bairro: "Boa Vista",
    vagas: 6,
    descricao: "Reforço escolar e rodas de leitura para crianças do ensino fundamental, aos sábados de manhã."
  },
  {
    id: 4,
    nome: "Saúde em Ação",
    categoria: "Saúde",
    bairro: "Vila Nova",
    vagas: 5,
    descricao: "Acompanhamento preventivo de saúde e caminhadas orientadas para a terceira idade."
  },
  {
    id: 5,
    nome: "Patas na Rua",
    categoria: "Animais",
    bairro: "Costa e Silva",
    vagas: 4,
    descricao: "Resgate, castração e adoção responsável de cães e gatos. Precisa de apoio em feiras de adoção."
  },
  {
    id: 6,
    nome: "Sinfonia Comunitária",
    categoria: "Cultura",
    bairro: "Aventureiro",
    vagas: 3,
    descricao: "Aulas gratuitas de música e instrumentos de corda para jovens da rede pública."
  }
];

let selectedCategory = "Todas";

// Elementos do DOM
const ongListContainer = document.getElementById("ong-list");
const searchInput = document.getElementById("search-input");
const filterModal = document.getElementById("filter-modal");
const profileModal = document.getElementById("profile-modal");
const applyModal = document.getElementById("apply-modal");
const successModal = document.getElementById("success-modal");

const openFilterBtn = document.getElementById("open-filter-btn");
const openFilterModalBtn = document.getElementById("open-filter-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const applyFilterBtn = document.getElementById("apply-filter-btn");

const openProfileBtn = document.getElementById("open-profile-btn");
const closeProfileBtn = document.getElementById("close-profile-btn");
const closeProfileAC = document.getElementById("close-profile-action");

const closeApplyBtn = document.getElementById("close-apply-btn");
const applyForm = document.getElementById("apply-form");
const finishSuccessBtn = document.getElementById("finish-success-btn");

const serviceTitle = document.getElementById("service-title");
const serviceLocation = document.getElementById("service-location");
const serviceDescription = document.getElementById("service-description");

const categoryButtons = document.querySelectorAll(".category-btn");
const activeFilterBadge = document.getElementById("active-filter-badge");
const activeFilterName = document.getElementById("active-filter-name");
const clearFilterBtn = document.getElementById("clear-filter-btn");
const sortSelect = document.getElementById("sort-select");

const totalVagasSpan = document.getElementById("total-vagas");
const totalOrgsSpan = document.getElementById("total-orgs");

function updateStats(filteredList) {
  if (totalOrgsSpan) totalOrgsSpan.textContent = filteredList.length;
  if (totalVagasSpan) {
    const totalVagas = filteredList.reduce((acc, curr) => acc + curr.vagas, 0);
    totalVagasSpan.textContent = totalVagas;
  }
}

function renderONGS() {
  if (!ongListContainer) return;

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const sortType = sortSelect ? sortSelect.value : "mais-vagas";

  let filteredONGS = ongsData.filter(ong => {
    const matchesCategory = (selectedCategory === "Todas" || ong.categoria === selectedCategory);
    const matchesSearch = ong.nome.toLowerCase().includes(searchTerm) || 
                          ong.categoria.toLowerCase().includes(searchTerm) ||
                          ong.descricao.toLowerCase().includes(searchTerm) ||
                          ong.bairro.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (sortType === "mais-vagas") {
    filteredONGS.sort((a, b) => b.vagas - a.vagas);
  } else if (sortType === "alfabetica") {
    filteredONGS.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  updateStats(filteredONGS);

  if (filteredONGS.length === 0) {
    ongListContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: #64748b;">
        <p style="font-size: 1.1rem; font-weight: 600;">Nenhuma organização encontrada.</p>
        <p style="font-size: 0.9rem;">Tente pesquisar por outro termo ou alterar os filtros.</p>
      </div>
    `;
    return;
  }

  ongListContainer.innerHTML = filteredONGS.map(ong => `
    <div class="card-ong">
      <div class="card-header">
        <div>
          <h3>${ong.nome}</h3>
          <span class="ong-meta">${ong.categoria} • ${ong.bairro}</span>
        </div>
        <span class="vagas-badge">${ong.vagas} vagas abertas</span>
      </div>
      <p class="ong-description">${ong.descricao}</p>
      <div class="card-footer">
        <button type="button" class="btn-primary btn-quero-ajudar" data-id="${ong.id}">Quero ajudar</button>
      </div>
    </div>
  `).join("");
}

// Escutador Global na Lista (Event Delegation) - FUNCIONA SEMPRE
if (ongListContainer) {
  ongListContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".btn-quero-ajudar");
    if (button) {
      const ongId = parseInt(button.getAttribute("data-id"));
      const ong = ongsData.find(o => o.id === ongId);
      
      if (ong && applyModal) {
        if (serviceTitle) serviceTitle.textContent = ong.nome;
        if (serviceLocation) serviceLocation.textContent = `${ong.categoria} • Joinville (${ong.bairro}) — ${ong.vagas} vagas disponíveis`;
        if (serviceDescription) serviceDescription.textContent = ong.descricao;
        
        applyModal.classList.add("active");
      }
    }
  });
}

// Submeter Inscrição
if (applyForm) {
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (applyModal) applyModal.classList.remove("active");
    if (successModal) successModal.classList.add("active");
    applyForm.reset();
  });
}

if (finishSuccessBtn) {
  finishSuccessBtn.addEventListener("click", () => {
    if (successModal) successModal.classList.remove("active");
  });
}

// Abertura/Fechamento de Modais
if (openFilterBtn) openFilterBtn.addEventListener("click", () => filterModal && filterModal.classList.add("active"));
if (openFilterModalBtn) openFilterModalBtn.addEventListener("click", () => filterModal && filterModal.classList.add("active"));
if (closeModalBtn) closeModalBtn.addEventListener("click", () => filterModal && filterModal.classList.remove("active"));

if (openProfileBtn) openProfileBtn.addEventListener("click", () => profileModal && profileModal.classList.add("active"));
if (closeProfileBtn) closeProfileBtn.addEventListener("click", () => profileModal && profileModal.classList.remove("active"));
if (closeProfileAC) closeProfileAC.addEventListener("click", () => profileModal && profileModal.classList.remove("active"));

if (closeApplyBtn) closeApplyBtn.addEventListener("click", () => applyModal && applyModal.classList.remove("active"));

window.addEventListener("click", (e) => {
  if (filterModal && e.target === filterModal) filterModal.classList.remove("active");
  if (profileModal && e.target === profileModal) profileModal.classList.remove("active");
  if (applyModal && e.target === applyModal) applyModal.classList.remove("active");
  if (successModal && e.target === successModal) successModal.classList.remove("active");
});

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
  });
});

if (applyFilterBtn) {
  applyFilterBtn.addEventListener("click", () => {
    if (filterModal) filterModal.classList.remove("active");
    if (selectedCategory !== "Todas") {
      if (activeFilterBadge) activeFilterBadge.style.display = "inline-flex";
      if (activeFilterName) activeFilterName.textContent = selectedCategory;
    } else {
      if (activeFilterBadge) activeFilterBadge.style.display = "none";
    }
    renderONGS();
  });
}

if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    selectedCategory = "Todas";
    categoryButtons.forEach(b => {
      b.classList.toggle("active", b.dataset.category === "Todas");
    });
    if (activeFilterBadge) activeFilterBadge.style.display = "none";
    renderONGS();
  });
}

if (searchInput) searchInput.addEventListener("input", renderONGS);
if (sortSelect) sortSelect.addEventListener("change", renderONGS);

document.addEventListener("DOMContentLoaded", renderONGS);
