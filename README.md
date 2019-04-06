# Open OlhoVivo

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

### To-do (front-end):
- [ ] Estruturar o front-end
- [ ] Estilizar
- [ ] Aplicar o Google Maps (ou qualquer outra API de mapa que disponibilize overlay e posicionamento de marcadores)
- [ ] Criar localStorage para guardar os favoritos
- [ ] Realizar a comunicação deste com a API
- [ ] Unit tests com Jest
- [ ] E2E tests com CodeceptJS
- [ ] Transformar em um app PWA

### To-do (geral):
- [ ] Hospedar a aplicação - Now, Heroku ou Netlify

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