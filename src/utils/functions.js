import store from '../store';
import constants from '../store/constants';

const normalizeLineData = (line, lineBack = {}) => ({
  lineId: line.cl,
  from: line.sl === 1 ? line.ts : line.tp,
  to: line.sl === 1 ? line.tp : line.ts,
  number: `${line.lt}-${line.tl}`,
  direction: line.sl === 1 ? 'going' : 'back',
  circular: line.lc,
  toggleLine: lineBack,
});

const isFavorited = lineId => !!store.state.favorites.filter(
  item => item.lineId === lineId,
).length;

const saveFavoriteLine = line => store.dispatch(constants.SAVE_FAVORITE_LINE, line);

const removeFavoriteLine = lineId => store.dispatch(constants.REMOVE_FAVORITE_LINE, lineId);

const toggleFavorite = line => (isFavorited(line.lineId)
  ? removeFavoriteLine(line.lineId)
  : saveFavoriteLine(line));

const getFavoritedIcon = lineId => (!isFavorited(lineId) ? 'star_border' : 'star');

export default {
  normalizeLineData,
  isFavorited,
  toggleFavorite,
  saveFavoriteLine,
  removeFavoriteLine,
  getFavoritedIcon,
};
