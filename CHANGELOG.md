# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).

## [0.2.0]
### Adicionado
- Interface web em `public/` com listagem, busca e filtro por área.
- Formulário de inscrição de voluntários com validação no servidor.
- Rotas `GET /api/ongs`, `GET /api/ongs/:id`, `GET /api/areas` e `POST /api/inscricoes`.
- Testes de serviços e de API.

### Alterado
- API reorganizada em camadas (`routes`, `services`, `data`).

## [0.1.0]
### Adicionado
- Estrutura inicial do repositório, plano de GCS, pipelines de CI e de deploy (`staging` e `production`).
