import constants from './constants';
import api from '../utils/api';

export default {
  [constants.SEARCH_LINES]({ commit }, payload) {
    commit(constants.BLOCK_UI);
    return api.searchLines(payload)
      .then((data) => {
        commit(constants.SEARCH_LINES, data);
      })
      .catch(() => commit(constants.SEARCH_LINES, []))
      .finally(() => commit(constants.UNBLOCK_UI));
  },
  [constants.GET_LINE_ROUTE_AND_POSITIONS](
    { dispatch, commit },
    { number, direction, lineId },
  ) {
    commit(constants.BLOCK_UI);
    return Promise.all([
      dispatch(constants.GET_LINE_ROUTE, { number, direction }),
      dispatch(constants.GET_LINE_POSITIONS, { lineId }),
    ])
      .finally(() => commit(constants.UNBLOCK_UI));
  },
  [constants.GET_LINE_ROUTE]({ commit }, { number, direction }) {
    return api.getLineRoute(number, direction)
      .then((data) => {
        commit(constants.GET_LINE_ROUTE, data.map(
          latLng => [latLng[1], latLng[0]],
        ));
      })
      .catch((e) => {
        commit(constants.GET_LINE_ROUTE, []);
        commit(constants.REQUEST_ERROR, e.message);
      });
  },
  [constants.GET_LINE_POSITIONS]({ commit }, { lineId }) {
    return api.getLinePositions(lineId)
      .then(data => commit(constants.GET_LINE_POSITIONS, data))
      .catch((e) => {
        commit(constants.GET_LINE_POSITIONS, []);
        commit(constants.REQUEST_ERROR, e.message);
      });
  },
};
