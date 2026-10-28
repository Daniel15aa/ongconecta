# Plano de Gerência de Configuração (GCS) – OngConecta

## 1. Objetivo
Garantir que toda alteração no projeto seja identificada, revisada, rastreável e que se saiba qual versão está em cada ambiente.

## 2. Itens de configuração (ICs)
| IC | Local | Controle |
|---|---|---|
| Código-fonte (API e interface) | `src/`, `public/` | PR + revisão |
| Testes | `test/` | PR + CI |
| Dependências | `package.json` | PR + CI |
| Pipelines | `.github/workflows/` | PR + CODEOWNERS |
| Documentação e evidências | `docs/` | PR |

Segredos **nunca** vão para o repositório (usar GitHub Secrets).

## 3. Identificação e versionamento
- Semantic Versioning: `vMAJOR.MINOR.PATCH`.
- Cada release gera uma tag (ex.: `v0.1.0`).
- Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Histórico de versões em [`CHANGELOG.md`](../CHANGELOG.md); fluxo de contribuição em [`CONTRIBUTING.md`](../CONTRIBUTING.md).

## 4. Estratégia de branches
- `main`: protegida, sempre estável, sem push direto.
- `feature/*`, `fix/*`, `docs/*`: ramos curtos que entram na `main` só via Pull Request.

## 5. Controle de mudanças
1. Abrir issue descrevendo a mudança.
2. Criar branch a partir da `main`.
3. Abrir PR (template obrigatório) vinculado à issue.
4. CI deve passar e **1 aprovação** de outro membro (par de revisão) é exigida.
5. Merge na `main` por quem tem acesso de escrita.

## 6. Baselines
Uma baseline = tag + commit + dependências + resultado do CI + notas de release. Alterar uma baseline exige novo PR e nova tag.

## 7. Ambientes e promoção
`main` → **staging** (automático) → **production** (aprovação obrigatória do revisor/professor, via GitHub Environments).

## 8. Papéis
| Papel | Responsável | Função |
|---|---|---|
| Autor / Mantenedor | Daniel | Implementa e abre PRs |
| Par de revisão (acesso de escrita) | Wesley | Revisa e aprova PRs |
| Aprovador de produção | Professor | Revisor obrigatório do environment `production` |

## 9. Rastreabilidade
Issue ↔ branch ↔ PR ↔ commit ↔ tag/release ↔ deploy (histórico em Actions).

## 10. Auditoria
Evidências em `docs/evidencias/` (recusa de push direto, PR aprovado, environments).
