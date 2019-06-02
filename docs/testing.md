# Testando

[< Voltar](../README.md)

## E2E tests

O projeto utiliza o [CodeceptJS](https://codecept.io) como framework para testes E2E, junto com o driver [Puppeteer](https://github.com/GoogleChrome/puppeteer).

Utiliza-se o recurso de features ([Gherkin syntax](https://cucumber.io/docs/gherkin/) e [Cucumber expressions](https://cucumber.io/docs/cucumber/cucumber-expressions/)) e step definitions, com o intuito de aproximar a escrita de testes com uma linguagem mais humana, no formato de BDD (Behavior Driven Tests). As features atuais podem ser lidas [aqui](../tests/e2e/features).

Com o servidor local rodando, basta executar:
```
yarn test:e2e
```

O Chrome será aberto diversas vezes até a finalização dos testes, que serão descritos passo-a-passo no terminal.

Caso encontre erro, os prints de tela serão adicionados em uma pasta `./output` na raiz do projeto.

## Unit tests

O projeto foi criado utilizando o [Vue CLI](https://cli.vuejs.org), e já na instalação foi adicionado o [Jest](https://jestjs.io/).

Para os assertions, é utilizado o [Chai](https://www.chaijs.com/).

Para rodar os testes, execute:
```
yarn test:unit
```