import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import mutations from './store/mutations';
import getters from './store/getters';
import actions from './store/actions';

Vue.use(Vuex);

export const initialState = {
  latLngPaths: [],
  positions: [],
  linesFound: [],
  selectedLine: {},
  favorites: [],
  searchDialog: true,
  isLoading: false,
  error: null,
};

export const storeConfig = {
  plugins: [
    createPersistedState({
      reducer: (persistedState) => {
        const stateToSave = {};
        const propsToSave = ['favorites', 'selectedLine'];

        propsToSave.forEach((item) => {
          stateToSave[item] = persistedState[item];
        });

        return stateToSave;
      },
    }),
  ],
  state: initialState,
  mutations,
  getters,
  actions,
};

export default new Vuex.Store(storeConfig);
