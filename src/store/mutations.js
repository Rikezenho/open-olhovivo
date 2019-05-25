import Vue from 'vue';
import constants from './constants';

export default {
  [constants.BLOCK_UI](state) {
    Vue.set(state, 'isLoading', true);
  },
  [constants.UNBLOCK_UI](state) {
    Vue.set(state, 'isLoading', false);
  },
  [constants.TOGGLE_SEARCH](state) {
    Vue.set(state, 'searchDialog', !state.searchDialog);
  },
  [constants.NOTIFICATION](state, payload) {
    Vue.set(state, 'notification', payload);
  },
  [constants.REQUEST_ERROR](state, payload) {
    Vue.set(state, 'error', payload);
  },
  [constants.SEARCH_LINES](state, payload) {
    Vue.set(state, 'linesFound', payload);
  },
  [constants.SELECT_LINE](state, payload) {
    Vue.set(state, 'selectedLine', payload);
  },
  [constants.TOGGLE_LINE_DIRECTION](state) {
    const lineToSaveWithoutToggleLine = { ...state.selectedLine };
    delete lineToSaveWithoutToggleLine.toggleLine;
    const newLine = Object.assign({}, state.selectedLine.toggleLine);
    newLine.toggleLine = lineToSaveWithoutToggleLine;
    Vue.set(state, 'selectedLine', newLine);
  },
  [constants.GET_LINE_ROUTE](state, payload) {
    Vue.set(state, 'latLngPaths', payload);
  },
  [constants.GET_LINE_POSITIONS](state, payload) {
    Vue.set(state, 'positions', payload);
  },
  [constants.SAVE_FAVORITE_LINE](state, payload) {
    state.favorites.push(payload);
  },
  [constants.REMOVE_FAVORITE_LINE](state, payload) {
    Vue.set(state, 'favorites', state.favorites.filter(item => item.lineId !== payload));
  },
};
