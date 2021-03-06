const axios = require('axios').default;
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support').default;

const configs = require('./configs');

const singleton = () => {
  axiosCookieJarSupport(axios);

  const cookieJar = new tough.CookieJar();

  const getCredentials = () => new Promise((resolve, reject) => {
    axios.get(configs.olhovivo.BASE_URL, {
      jar: cookieJar,
      withCredentials: true,
    })
      .then((response) => {
        if (
          response.headers
          && response.headers['set-cookie']
          && response.headers['set-cookie'].length
        ) {
          const setCookieInstruction = response.headers['set-cookie'];
          const cookieParts = setCookieInstruction[0].split(';');
          const apiCredentials = cookieParts[0].replace('apiCredentials=', '').trim();
          resolve(apiCredentials);
        }
      })
      .catch(e => reject(new Error(e)));
  });

  const getCredentialsSpTrans = () => new Promise((resolve, reject) => {
    axios.get(configs.sptrans.BASE_URL, {
      jar: cookieJar,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch(e => reject(new Error(e)));
  });

  const searchBusLine = search => new Promise(
    async (resolve, reject) => {
      await getCredentials().catch(e => reject(e));

      const URL = configs.urlBuscaLinhas(search);
      axios.get(URL, {
        jar: cookieJar,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch(e => reject(new Error(e)));
    },
  );

  const getLineSchedule = lineId => new Promise(
    async (resolve, reject) => {
      await getCredentials().catch(e => reject(e));

      const URL = configs.urlPrevisaoLinha(lineId);
      axios.get(URL, {
        jar: cookieJar,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch(e => reject(new Error(e)));
    },
  );

  const getLinePosition = lineId => new Promise(
    async (resolve, reject) => {
      await getCredentials().catch(e => reject(e));

      const URL = configs.urlPosicaoLinha(lineId);
      axios.get(URL, {
        jar: cookieJar,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch(e => reject(new Error(e)));
    },
  );

  const getLineRoute = (lineNumber, direction) => new Promise(
    async (resolve, reject) => {
      await getCredentialsSpTrans().catch(e => reject(e));

      const URL = configs.urlSpTransLinhaRota(lineNumber, direction);
      axios.get(URL, {
        jar: cookieJar,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch(e => reject(new Error(e)));
    },
  );

  return {
    getCredentials,
    getCredentialsSpTrans,
    searchBusLine,
    getLineSchedule,
    getLinePosition,
    getLineRoute,
  };
};

module.exports = singleton;
