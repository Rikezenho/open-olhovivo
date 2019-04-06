const BASE_URL = 'http://olhovivo.sptrans.com.br';
const SPTRANS_BASE_URL = 'http://www.sptrans.com.br/itinerarios';

const olhovivo = {
  BASE_URL,
  buscaLinhas: `${BASE_URL}/data/Linha/Buscar`,
  previsaoLinha: `${BASE_URL}/data/Previsao/Linha`,
  posicaoLinha: `${BASE_URL}/data/Posicao/Linha`,
};

const sptrans = {
  BASE_URL: SPTRANS_BASE_URL,
  getLinha: `${SPTRANS_BASE_URL}/linha/`,
};

const urlBuscaLinhas = termosBusca => `${olhovivo.buscaLinhas}?termosBusca=${termosBusca}`;
const urlPrevisaoLinha = codigoLinha => `${olhovivo.previsaoLinha}?codigoLinha=${codigoLinha}`;
const urlPosicaoLinha = codigoLinha => `${olhovivo.posicaoLinha}?codigoLinha=${codigoLinha}`;
const urlSpTransLinha = codigoLinha => `${sptrans.getLinha}?cdp=${codigoLinha}`;
const urlSpTransLinhaRota = (linhaNumber, direction) => `http://201.63.30.42:8080/geoserver/SIM/wms?service=WFS&version=2.0&request=GetFeature&typeName=SIM%3ALinhas&outputFormat=application%2Fjson&CQL_FILTER=LINHA%20LIKE%20%27%25${linhaNumber}%25%27%20AND%20SENTIDO%20%3D%20${direction}`;

module.exports = {
  olhovivo,
  sptrans,
  urlBuscaLinhas,
  urlPrevisaoLinha,
  urlPosicaoLinha,
  urlSpTransLinha,
  urlSpTransLinhaRota,
};
