# Como contribuir

[< Voltar](../README.md)

Clone o projeto, instale as dependências (rode `yarn` na raiz do projeto, pois este projeto utiliza de [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces)).

Depois, inicie o back-end e o front-end com o comando:
```
yarn start
```

Para buildar o projeto para produção, execute:
```
yarn build
```

## Padrão de commits

O projeto possui um pre-hook de `commit-msg`, com o intuito de padronizar as mensagens de commit.

Como padrão, foi setado o [conventional commits](https://www.conventionalcommits.org/), e o [Commitizen CLI](https://github.com/commitizen/cz-cli) foi acrescentado ao projeto com o intuito de facilitar esta tarefa.

Utilize o `cz-cli` com o comando:

```
yarn commit
```

Desta forma, dialogs serão apresentados para detalhar qual é o intuito do commit, passando por `type`, `scope (optional)`, `short description (imperative tense)`, `long description (optional)`, `breaking change (default: no)` e `related issues (default: no)`.

## Branches

O projeto possui apenas `master` e `develop` como branches "long-lived".

É recomendado:
- Criar sua branch a partir da `master`
- Testar em `develop`
- Abrir o _Merge Request_ da sua branch para a `master`.

É possível testar o desenvolvimento na branch `develop` localmente. Para o front-end, o [Netlify DEV](https://www.netlify.com/products/dev/) é uma ferramenta muito útil, pois com ela, é possível subir um ambiente aberto para a internet.