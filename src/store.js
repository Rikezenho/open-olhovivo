import Vue from 'vue';
import Vuex from 'vuex';
import api from './utils/api';

Vue.use(Vuex);

export const constants = {
  BLOCK_UI: 'BLOCK_UI',
  UNBLOCK_UI: 'UNBLOCK_UI',
  REQUEST_ERROR: 'REQUEST_ERROR',
  SEARCH_LINES: 'SEARCH_LINES',
  SELECT_LINE: 'SELECT_LINE',
  TOGGLE_LINE_DIRECTION: 'TOGGLE_LINE_DIRECTION',
  GET_LINE_ROUTE: 'GET_LINE_ROUTE',
  GET_LINE_POSITIONS: 'GET_LINE_POSITIONS',
  SAVE_FAVORITE_LINE: 'SAVE_FAVORITE_LINE',
  REMOVE_FAVORITE_LINE: 'REMOVE_FAVORITE_LINE',
};

export default new Vuex.Store({
  state: {
    positions: [],
    linesFound: [],
    selectedLine: {},
    selectedBackLine: {},
    favorites: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    [constants.BLOCK_UI](state) {
      Vue.set(state, 'isLoading', true);
    },
    [constants.UNBLOCK_UI](state) {
      Vue.set(state, 'isLoading', false);
    },
    [constants.REQUEST_ERROR](state, payload) {
      Vue.set(state, 'error', payload);
    },
    [constants.SEARCH_LINES](state, payload) {
      Vue.set(state, 'linesFound', payload);
    },
    [constants.SELECT_LINE](state, { going, back }) {
      Vue.set(state, 'selectedLine', going);
      Vue.set(state, 'selectedBackLine', back);
    },
    [constants.TOGGLE_LINE_DIRECTION](state) {
      const oldSelectedLine = state.selectedLine;
      Vue.set(state, 'selectedLine', state.selectedBackLine);
      Vue.set(state, 'selectedBackLine', oldSelectedLine);
    },
    [constants.GET_LINE_ROUTE](state, payload) {
      Vue.set(state.selectedLine, 'latLngPaths', payload);
    },
    [constants.GET_LINE_POSITIONS](state, payload) {
      Vue.set(state, 'positions', payload);
    },
    [constants.SAVE_FAVORITE_LINE](state, payload) {
      state.favorites.push(payload);
    },
    [constants.REMOVE_FAVORITE_LINE](state, payload) {
      Vue.set(state, 'favorites', state.favorites.filter(item => item.id !== payload));
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    selectedLine: state => state.selectedLine,
    positions: state => state.positions,
    favorites: state => state.favorites,
    linesFound: state => state.linesFound,
  },
  actions: {
    [constants.BLOCK_UI]({ commit }) {
      commit(constants.BLOCK_UI);
    },
    [constants.UNBLOCK_UI]({ commit }) {
      commit(constants.UNBLOCK_UI);
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

      const { selectedLine: { lineNumber, direction, lineId } } = state;
      dispatch(constants.GET_LINE_ROUTE, { lineNumber, direction });
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
  },
});
