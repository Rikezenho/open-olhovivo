import constants from './constants';

export default {
  [constants.BLOCK_UI](state) {
    state.isLoading = true;
  },
  [constants.UNBLOCK_UI](state) {
    state.isLoading = false;
  },
  [constants.TOGGLE_SEARCH](state) {
    state.searchDialog = !state.searchDialog;
  },
  [constants.NOTIFICATION](state, payload) {
    state.notification = payload;
  },
  [constants.REQUEST_ERROR](state, payload) {
    state.error = payload;
  },
  [constants.CLEAR_ERROR](state) {
    state.error = '';
  },
  [constants.SEARCH_LINES](state, payload) {
    state.linesFound = payload;
  },
  [constants.SELECT_LINE](state, payload) {
    state.selectedLine = payload;
  },
  [constants.TOGGLE_LINE_DIRECTION](state) {
    const lineToSaveWithoutToggleLine = { ...state.selectedLine };
    delete lineToSaveWithoutToggleLine.toggleLine;

    const newLine = { ...state.selectedLine.toggleLine };
    newLine.toggleLine = lineToSaveWithoutToggleLine;

    state.selectedLine = newLine;
  },
  [constants.GET_LINE_ROUTE](state, payload) {
    state.latLngPaths = payload;
  },
  [constants.GET_LINE_POSITIONS](state, payload) {
    state.positions = payload;
  },
  [constants.SAVE_FAVORITE_LINE](state, payload) {
    state.favorites.push(payload);
  },
  [constants.REMOVE_FAVORITE_LINE](state, payload) {
    state.favorites = state.favorites.filter(item => item.lineId !== payload);
  },
};
