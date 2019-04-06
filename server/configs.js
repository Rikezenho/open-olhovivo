const BASE_URL = 'http://olhovivo.sptrans.com.br';

const olhovivo = {
  BASE_URL,
  buscaLinhas: `${BASE_URL}/data/Linha/Buscar`,
  previsaoLinha: `${BASE_URL}/data/Previsao/Linha`,
  posicaoLinha: `${BASE_URL}/data/Posicao/Linha`,
};

const urlBuscaLinhas = termosBusca => `${olhovivo.buscaLinhas}?termosBusca=${termosBusca}`;
const urlPrevisaoLinha = codigoLinha => `${olhovivo.previsaoLinha}?codigoLinha=${codigoLinha}`;
const urlPosicaoLinha = codigoLinha => `${olhovivo.posicaoLinha}?codigoLinha=${codigoLinha}`;

module.exports = {
  olhovivo,
  urlBuscaLinhas,
  urlPrevisaoLinha,
  urlPosicaoLinha,
};
