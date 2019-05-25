<template>
  <v-app>
    <v-loading-overlay />
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
import axios from 'axios';
import OpenOlhoVivoMap from './components/OpenOlhoVivoMap.vue';
import UpdateDialog from './components/UpdateDialog.vue';
import Header from './layout/Header.vue';
import LoadingOverlay from './layout/LoadingOverlay.vue';
import NotificationArea from './layout/NotificationArea.vue';
import versionJson from './version.json';

import { constants } from './store';

export default {
  name: 'App',
  created() {
    document.addEventListener(
      'swUpdated', this.showUpdateNotification, { once: true },
    );

    window.appVersion = versionJson.version;
    const currentVersion = versionJson.version || '0.0.0';
    axios.get('/version.json')
      .then(({ data }) => {
        if (data.version !== currentVersion) {
          document.dispatchEvent(new CustomEvent('updateAvailable', { detail: { version: data.version } }));
        }
      });
  },
  methods: {
    showUpdateNotification() {
      this.$store.dispatch(constants.NOTIFICATION, 'Nova versão instalada!');
    },
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
