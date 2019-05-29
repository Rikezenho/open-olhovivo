import { expect } from 'chai';
import constants from '@/store/constants';
import mutations from '@/store/mutations';
import mocks from './mocks';

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
      mocks.busLine,
    ];
    mutations[constants.SEARCH_LINES](state, linesFound);
    expect(state.linesFound.length).to.equal(linesFound.length);
  });
  it(`should select line when ${constants.SELECT_LINE} is commited`, () => {
    const state = { selectedLine: [] };
    mutations[constants.SELECT_LINE](state, mocks.busLine);
    expect(state.selectedLine).to.deep.equal(mocks.busLine);
  });
  it(`should invert line direction when ${constants.TOGGLE_LINE_DIRECTION} is commited`, () => {
    const toggledLine = mocks.busLine;
    const currentLine = mocks.busLineReverse;

    const state = {
      selectedLine: {
        ...currentLine,
        toggleLine: toggledLine,
      },
    };

    const expectedLine = {
      ...toggledLine,
      toggleLine: currentLine,
    };

    mutations[constants.TOGGLE_LINE_DIRECTION](state);
    expect(state.selectedLine).to.deep.equal(expectedLine);
  });
  it(`should invert line direction when ${constants.TOGGLE_LINE_DIRECTION} is commited and keep the old one in 'toggleLine'`, () => {
    const toggledLine = mocks.busLine;
    const currentLine = mocks.busLineReverse;

    const state = {
      selectedLine: {
        ...currentLine,
        toggleLine: toggledLine,
      },
    };

    mutations[constants.TOGGLE_LINE_DIRECTION](state);
    expect(state.selectedLine.toggleLine).to.deep.equal(currentLine);
  });
  it(`should set some lat lngs when ${constants.GET_LINE_ROUTE} is commited`, () => {
    const state = { latLngPaths: [] };
    mutations[constants.GET_LINE_ROUTE](state, mocks.latLngPaths);
    expect(state.latLngPaths).to.deep.equal(mocks.latLngPaths);
  });
  it(`should set some positions when ${constants.GET_LINE_POSITIONS} is commited`, () => {
    const state = { positions: [] };
    mutations[constants.GET_LINE_POSITIONS](state, mocks.busPositions);
    expect(state.positions).to.deep.equal(mocks.busPositions);
  });
  it(`should set favorite when ${constants.SAVE_FAVORITE_LINE} is commited`, () => {
    const state = { favorites: [] };
    mutations[constants.SAVE_FAVORITE_LINE](state, mocks.busLine);
    expect(state.favorites).to.deep.include.members([mocks.busLine]);
  });
  it(`should remove favorite when ${constants.REMOVE_FAVORITE_LINE} is commited`, () => {
    const state = {
      favorites: [
        mocks.busLine,
      ],
    };
    mutations[constants.REMOVE_FAVORITE_LINE](state, mocks.busLine.lineId);
    expect(state.favorites).to.not.deep.include.members([mocks.busLine]);
  });
});
