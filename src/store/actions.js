import constants from './constants';
import api from '../utils/api';

export default {
  [constants.BLOCK_UI]({ commit }) {
    commit(constants.BLOCK_UI);
  },
  [constants.UNBLOCK_UI]({ commit }) {
    commit(constants.UNBLOCK_UI);
  },
  [constants.TOGGLE_SEARCH]({ commit }) {
    commit(constants.TOGGLE_SEARCH);
  },
  [constants.NOTIFICATION]({ commit }, payload) {
    commit(constants.NOTIFICATION, payload);
  },
  [constants.REQUEST_ERROR]({ commit }, payload) {
    commit(constants.REQUEST_ERROR, payload);
  },
  [constants.CLEAR_ERROR]({ commit }) {
    commit(constants.CLEAR_ERROR);
  },
  [constants.SEARCH_LINES]({ dispatch, commit }, payload) {
    dispatch(constants.BLOCK_UI);
    api.searchLines(payload)
      .then((data) => {
        commit(constants.SEARCH_LINES, data);
      })
      .catch(() => commit(constants.SEARCH_LINES, []))
      .finally(() => dispatch(constants.UNBLOCK_UI));
  },
  [constants.SELECT_LINE]({ commit }, payload) {
    commit(constants.SELECT_LINE, payload);
  },
  [constants.TOGGLE_LINE_DIRECTION]({ dispatch, commit, state }) {
    commit(constants.TOGGLE_LINE_DIRECTION);

    const { selectedLine: { number, direction, lineId } } = state;
    dispatch(constants.GET_LINE_ROUTE, { lineNumber: number, direction });
    dispatch(constants.GET_LINE_POSITIONS, { lineId });
  },
  [constants.GET_LINE_ROUTE]({ dispatch, commit }, { lineNumber, direction }) {
    dispatch(constants.BLOCK_UI);
    api.getLineRoute(lineNumber, direction)
      .then((data) => {
        commit(constants.GET_LINE_ROUTE, data.map(
          latLng => [latLng[1], latLng[0]],
        ));
      })
      .catch((e) => {
        commit(constants.GET_LINE_ROUTE, []);
        dispatch(constants.REQUEST_ERROR, e.message);
      })
      .finally(() => dispatch(constants.UNBLOCK_UI));
  },
  [constants.GET_LINE_POSITIONS]({ dispatch, commit }, { lineId }) {
    dispatch(constants.BLOCK_UI);
    api.getLinePositions(lineId)
      .then(data => commit(constants.GET_LINE_POSITIONS, data))
      .catch((e) => {
        commit(constants.GET_LINE_POSITIONS, []);
        dispatch(constants.REQUEST_ERROR, e.message);
      })
      .finally(() => dispatch(constants.UNBLOCK_UI));
  },
  [constants.SAVE_FAVORITE_LINE]({ commit }, payload) {
    commit(constants.SAVE_FAVORITE_LINE, payload);
  },
  [constants.REMOVE_FAVORITE_LINE]({ commit }, payload) {
    commit(constants.REMOVE_FAVORITE_LINE, payload);
  },
};
