<template>
  <v-app>
    <v-loading-overlay id="loading-overlay" />
    <v-header />
    <v-update-dialog />
    <v-content>
      <v-container fluid>
        <v-layout
          text-xs-center
          wrap
        >
          <open-olho-vivo-map />
        </v-layout>
      </v-container>
    </v-content>
    <v-notification-area />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import OpenOlhoVivoMap from './components/OpenOlhoVivoMap.vue';
import UpdateDialog from './components/UpdateDialog.vue';
import Header from './layout/Header.vue';
import LoadingOverlay from './layout/LoadingOverlay.vue';
import NotificationArea from './layout/NotificationArea.vue';
import versionJson from './version.json';

import constants from './store/constants';

export default {
  name: 'App',
  created() {
    document.addEventListener(
      'swUpdated', this.showUpdateNotification, { once: true },
    );

    window.appVersion = versionJson.version;
  },
  methods: {
    showUpdateNotification() {
      this[constants.NEW_VERSION_AVAILABLE]();
    },
    ...mapMutations([constants.NEW_VERSION_AVAILABLE]),
  },
  components: {
    OpenOlhoVivoMap,
    'v-header': Header,
    'v-loading-overlay': LoadingOverlay,
    'v-notification-area': NotificationArea,
    'v-update-dialog': UpdateDialog,
  },
};
</script>

<style lang="scss">
  .application {
    position: relative;
  }
</style>
