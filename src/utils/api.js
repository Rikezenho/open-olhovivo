import axios from 'axios';
import functions from './functions';

const { normalizeLineData } = functions;

const getLineRoute = (lineNumber, direction) => new Promise((resolve, reject) => {
  axios.get(
    `${process.env.API_URL}/linesSpTrans/${lineNumber}/route/${direction}`,
  )
    .then(({ data }) => {
      if (data.status) {
        const hasData = !!data.data.features.length;
        if (hasData) {
          resolve(data.data.features[0].geometry.coordinates[0]);
        } else {
          reject(new Error('No routes found.'));
        }
      }
    })
    .catch(e => reject(new Error(e)));
});

const getLinePositions = lineId => new Promise((resolve, reject) => {
  axios.get(`${process.env.API_URL}/lines/${lineId}/position`)
    .then(({ data }) => {
      if (data.status) {
        const hasData = !!data.data.vs.length;
        if (hasData) {
          resolve(data.data.vs);
        } else {
          reject(new Error('No positions found.'));
        }
      }
    })
    .catch(e => reject(new Error(e)));
});

const searchLines = term => new Promise((resolve, reject) => {
  axios.get(`${process.env.API_URL}/searchLines/${term}`)
    .then(({ data }) => {
      if (data.status) {
        const hasData = !!data.data.length;
        if (hasData) {
          resolve(data.data.map((item) => {
            const lineBack = data.data.filter(search => search.tp === item.tp
              && search.ts === item.ts
              && search.sl !== item.sl)[0];
            return normalizeLineData(item, normalizeLineData(lineBack));
          }));
        } else {
          reject(new Error('No lines found.'));
        }
      }
    })
    .catch(e => reject(new Error(e)));
});

export default {
  getLineRoute,
  getLinePositions,
  searchLines,
};
