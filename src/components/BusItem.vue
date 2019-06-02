<template>
  <v-list-tile avatar class="bus-line">
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
        ORIGEM: {{ line.from }}<br/>
        DESTINO: {{ line.to }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action @click="$utils.toggleFavorite(line)">
      <v-btn icon ripple class="bus-favorite-toggle">
        <v-icon
        :color="favoritedColor(line.lineId) + 'lighten-1'"
        :title="$utils.isFavorited(line.lineId) ? 'Favoritado' : 'Não favoritado'">
          {{ $utils.getFavoritedIcon(line.lineId) }}
        </v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapMutations } from 'vuex';
import constants from '../store/constants';

export default {
  name: 'BusItem',
  props: {
    line: Object,
    onClick: Function,
  },
  methods: {
    ...mapMutations([
      constants.TOGGLE_SEARCH,
      constants.SELECT_LINE,
    ]),
    selectLine(line) {
      this[constants.TOGGLE_SEARCH]();
      this[constants.SELECT_LINE](line);
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },
    favoritedColor(lineId) {
      return !this.$utils.isFavorited(lineId) ? 'grey' : 'amber';
    },
  },
};
</script>

<style lang="scss">
  .bus-line {
    cursor: pointer;
  }
</style>
