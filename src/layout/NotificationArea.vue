<template>
  <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      :timeout="6000"
    >
    {{ msg }}
    <v-btn
      dark
      flat
      @click="snackbar = false"
    >
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>
import { constants } from '../store';

export default {
  name: 'NotificationArea',
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === constants.REQUEST_ERROR) {
        this.snackbar = true;
        this.msg = `Erro: ${state.error}`;
      }
      if (mutation.type === constants.NOTIFICATION) {
        this.snackbar = true;
        this.msg = state.notification;
      }
    });
  },
  data() {
    return {
      snackbar: false,
      msg: '',
    };
  },
};
</script>

<style>
  .v-snack {
    z-index: 1002;
  }
</style>
