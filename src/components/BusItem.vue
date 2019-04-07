<template>
  <v-list-tile avatar>
    <v-list-tile-avatar @click="selectLine(line)">
      <v-icon>directions_bus</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content @click="selectLine(line)">
      <v-list-tile-title>
        {{ line.number }} -
        {{ line.direction === 'going' ? 'IDA' : 'VOLTA' }}
        {{ line.circular ? '(CIRCULAR)' : '' }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        ORIGEM: {{ line.direction === 'going' ? line.from : line.to }}<br/>
        DESTINO: {{ line.direction === 'going' ? line.to : line.from }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action @click="handleFavorite(line)">
      <v-btn icon ripple>
        <v-icon
        :color="favoritedColor(line.lineId) + 'lighten-1'">
          {{ favoritedIcon(line.lineId) }}
        </v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { constants } from '../store';
import functions from '../utils/functions';

const { normalizeLineData } = functions;

export default {
  name: 'BusItem',
  props: {
    line: Object,
    onClick: Function,
  },
  methods: {
    selectLine(line) {
      this.$store.dispatch(constants.TOGGLE_SEARCH);
      const lineBack = this.getLineBack(line);
      this.$store.dispatch(constants.SELECT_LINE, {
        ...line,
        lineBack,
      });
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },
    getLineBack(line) {
      const lines = this.$store.getters.linesFound;
      const lineBack = lines.filter(item => item.number === line.number
        && item.direction !== line.direction)[0];
      return lineBack;
    },
    favoritedColor(lineId) {
      return !this.isFavorited(lineId) ? 'grey' : 'amber';
    },
    favoritedIcon(lineId) {
      return !this.isFavorited(lineId) ? 'star_border' : 'star';
    },
    favoritedLines() {
      return this.$store.getters.favorites;
    },
    isFavorited(lineId) {
      return !!this.favoritedLines().filter(item => item.lineId === lineId).length;
    },
    handleFavorite(line) {
      if (this.isFavorited(line.lineId)) {
        this.removeFavoriteLine(line.lineId);
      } else {
        this.saveFavoriteLine(line);
      }
    },
    saveFavoriteLine(line) {
      const lineBack = normalizeLineData(this.getLineBack(line));
      this.$store.dispatch(constants.SAVE_FAVORITE_LINE, {
        ...line,
        lineBack,
      });
    },
    removeFavoriteLine(lineId) {
      this.$store.dispatch(constants.REMOVE_FAVORITE_LINE, lineId);
    },
  },
};
</script>
