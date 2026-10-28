# Como contribuir

Todo trabalho passa por Pull Request. A `main` não aceita push direto.

1. Abra (ou escolha) uma issue descrevendo a mudança.
2. Crie uma branch a partir da `main`: `feature/nome-curto`, `fix/nome-curto` ou `docs/nome-curto`.
3. Faça commits pequenos, no padrão Conventional Commits:
   `feat: adiciona filtro por bairro`, `fix: corrige validação de e-mail`, `docs: atualiza README`.
4. Rode `npm test` antes de abrir o PR.
5. Abra o PR preenchendo o template e vinculando a issue (`Closes #n`).
6. O PR precisa de CI verde e de 1 aprovação do par de revisão antes do merge.
7. Mudanças relevantes entram no `CHANGELOG.md`; releases ganham uma tag `vX.Y.Z`.

Segredos (senhas, tokens, chaves) nunca entram no repositório: use GitHub Secrets.
