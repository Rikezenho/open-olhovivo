# Open OlhoVivo API

[< Voltar](../README.md)

BASE_URL: https://open-olhovivo-api-rikezenho.vercel.app

path|método|descrição|
---|---|---
/searchLines/:term|GET|Busca as linhas de ônibus e retorna as opções
/lines/:busLineId/position|GET|Retorna a latitude e longitude dos veículos atuais da linha
/lines/:busLineId/schedule|GET|Retorna as próximas partidas da linha
/linesSpTrans/:busLineNumber/route/:direction|GET|Traz os pontos para poder realizer o tracejado da linha no mapa. Este deve ser passado o código visual da linha (ex: `5106-21`) e o sentido (`going` ou `back`)