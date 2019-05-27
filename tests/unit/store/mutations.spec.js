import { expect } from 'chai';
import constants from '@/store/constants';
import mutations from '@/store/mutations';

describe('mutations', () => {
  it(`should block ui when ${constants.BLOCK_UI} is commited`, () => {
    const state = { isLoading: false };
    mutations[constants.BLOCK_UI](state);
    expect(state.isLoading).to.equal(true);
  });
  it(`should unblock ui when ${constants.UNBLOCK_UI} is commited`, () => {
    const state = { isLoading: true };
    mutations[constants.UNBLOCK_UI](state);
    expect(state.isLoading).to.equal(false);
  });
  it(`should toggle search dialog when ${constants.TOGGLE_SEARCH} is commited`, () => {
    const state = { searchDialog: false };
    mutations[constants.TOGGLE_SEARCH](state);
    expect(state.searchDialog).to.equal(true);
  });
  it(`should show notification when ${constants.NOTIFICATION} is commited`, () => {
    const state = { notification: '' };
    const notification = 'Update realizado com sucesso!';
    mutations[constants.NOTIFICATION](state, notification);
    expect(state.notification).to.equal(notification);
  });
  it(`should show error when ${constants.REQUEST_ERROR} is commited`, () => {
    const state = { error: '' };
    const error = 'No routes found.';
    mutations[constants.REQUEST_ERROR](state, error);
    expect(state.error).to.equal(error);
  });
  it(`should clear error when ${constants.CLEAR_ERROR} is commited`, () => {
    const state = { error: '' };
    mutations[constants.CLEAR_ERROR](state);
    expect(state.error).to.equal('');
  });
  it(`should show lines when ${constants.SEARCH_LINES} is commited`, () => {
    const state = { linesFound: [] };
    const linesFound = [
      {
        number: '5106-21',
        name: 'Vila Olímpia',
      },
    ];
    mutations[constants.SEARCH_LINES](state, linesFound);
    expect(state.linesFound.length).to.equal(1);
  });
  it(`should select line when ${constants.SELECT_LINE} is commited`, () => {
    const state = { selectedLine: [] };
    const selectedLine = {
      number: '5106-21',
      name: 'Vila Olímpia',
    };
    mutations[constants.SELECT_LINE](state, selectedLine);
    expect(state.selectedLine).to.deep.equal(selectedLine);
  });
});
