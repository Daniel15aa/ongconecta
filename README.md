# OngConecta

Plataforma de voluntariado que reúne as organizações sociais de Joinville que aceitam voluntários. A pessoa escolhe uma causa, vê o que a organização precisa e se inscreve pelo site.

Projeto da atividade avaliativa N2 de Gerência de Configuração de Software (Engenharia de Software, Católica SC).
**Autores:** Daniel Jesus Nunes Trindade e Wesley dos Reis Marcos.

## Rodando localmente

Requer Node.js 18 ou superior.

```bash
npm install
npm start        # http://localhost:3000
npm test         # testes de serviços e de API
npm run dev      # reinicia o servidor ao salvar
```

## API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/ongs` | Lista organizações. Aceita `?area=` e `?q=` |
| GET | `/api/ongs/:id` | Detalha uma organização |
| GET | `/api/areas` | Lista as áreas de atuação |
| POST | `/api/inscricoes` | Registra a inscrição de um voluntário |
| GET | `/health` | Verificação de disponibilidade |

Exemplo de inscrição:

```bash
curl -X POST localhost:3000/api/inscricoes \
  -H "Content-Type: application/json" \
  -d '{"ongId": 3, "nome": "Maria Souza", "email": "maria@exemplo.com"}'
```

## Estrutura

```
src/
  routes/       recebe a requisição HTTP e devolve a resposta
  services/     regras de negócio e validação
  data/         dados de exemplo
public/         interface web (HTML, CSS e JS sem framework)
test/           testes automatizados (node:test)
docs/           plano de GCS e evidências
.github/        pipelines, template de PR e CODEOWNERS
```

As rotas não conhecem as regras de negócio e os serviços não conhecem HTTP. Isso permite testar a lógica sem subir o servidor e trocar os dados de exemplo por um banco depois.

## Gerência de configuração

O plano completo está em [`docs/PLANO_GCS.md`](docs/PLANO_GCS.md) e o fluxo de trabalho em [`CONTRIBUTING.md`](CONTRIBUTING.md).

| Item avaliado | Onde está |
|---|---|
| Plano de GCS e estrutura do repositório | [`docs/PLANO_GCS.md`](docs/PLANO_GCS.md) |
| Repositório acessível | Repositório público |
| Recusa de push direto na `main` | [`docs/evidencias/`](docs/evidencias/) e Settings → Rules |
| Par de revisão com acesso de escrita | Collaborators (role Write) e PR aprovado em [`docs/evidencias/`](docs/evidencias/) |
| Environments `staging` e `production` | Settings → Environments e [`deploy.yml`](.github/workflows/deploy.yml) |
