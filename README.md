# Open OlhoVivo

[![Netlify Status](https://api.netlify.com/api/v1/badges/5afea204-54f6-47bd-8851-044b94d2c8b4/deploy-status)](https://app.netlify.com/sites/open-olhovivo/deploys)

Projeto criado com o intuito de disponibilizar uma API simples, que se utiliza do próprio site da [Olho Vivo](http://olhovivo.sptrans.com.br) da SPTrans para buscar as informações das linhas.

Conta com uma API em Node.js e um front-end em Vue.js.

## THIS IS A WORK IN PROGRESS!

### To-do (back-end):
- [x] Método para chamar a API de busca de linhas
- [x] Método para chamar a API de posição da linha
- [x] Método para chamar a API de previsão da linha
- [x] Criação da API com Express e as rotas
- [ ] Unit tests
- [ ] Integration tests
- [ ] Passar o back-end para funções Lambda (abandonando a necessidade do Now.sh)

### To-do (front-end):
- [x] Estruturar o front-end
- [x] Estilizar
- [x] Aplicar o Leaflet.js (API gratuita de Maps)
- [x] Criar localStorage para guardar os favoritos
- [x] Realizar a comunicação deste com a API
- [ ] Unit tests com Jest
- [ ] E2E tests com CodeceptJS
- [x] Transformar em um app PWA

### To-do (geral):
- [x] Hospedar a aplicação - Now, Heroku ou Netlify
- [x] Acertar o logo e título do App

---

# Endpoints da API

BASE_URL: https://open-olhovivo-api.rikezenho.now.sh

path|método|descrição|
---|---|---
/searchLines/:term|GET|Busca as linhas de ônibus e retorna as opções
/lines/:busLineId/position|GET|Retorna a latitude e longitude dos veículos atuais da linha
/lines/:busLineId/schedule|GET|Retorna as próximas partidas da linha
/linesSpTrans/:busLineNumber/route/:direction|GET|Traz os pontos para poder realizer o tracejado da linha no mapa. Este deve ser passado o código visual da linha (ex: `5106-21`) e o sentido (`going` ou `back`)

---

# Como utilizar

Clone o projeto, instale as dependências (basta rodar `yarn` na raiz do projeto, pois este projeto utiliza de Yarn Workspaces) e utilize os npm scripts para rodar o projeto:

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "api": "cd server && yarn start",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "start:all": "concurrently --kill-others --prefix-colors bgCyan,bgMagenta \"npm:serve\" \"npm:api\"",
    "buildAndStartServer:all": "concurrently --kill-others --prefix-colors bgCyan,bgMagenta \"npm:build\" \"npm:api\""
}
```