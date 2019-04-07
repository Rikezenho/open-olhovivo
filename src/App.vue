<template>
  <v-app>
    <v-loading-overlay />
    <v-header />
    <v-content>
      <v-container fluid>
        <v-layout
          text-xs-center
          wrap
        >
          <open-olho-vivo-map v-if="selectedLine().lineId" />
          <div v-else>Busque uma linha para começar.</div>
        </v-layout>
      </v-container>
    </v-content>
    <v-notification-area />
  </v-app>
</template>

<script>
import OpenOlhoVivoMap from './components/OpenOlhoVivoMap.vue';
import Header from './layout/Header.vue';
import LoadingOverlay from './layout/LoadingOverlay.vue';
import NotificationArea from './layout/NotificationArea.vue';

export default {
  name: 'App',
  components: {
    OpenOlhoVivoMap,
    'v-header': Header,
    'v-loading-overlay': LoadingOverlay,
    'v-notification-area': NotificationArea,
  },
  data() {
    return {};
  },
  methods: {
    selectedLine() {
      return this.$store.getters.selectedLine;
    },
  },
};
</script>
