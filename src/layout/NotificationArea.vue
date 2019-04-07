<template>
  <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      :timeout="6000"
    >
    Erro: {{ error }}
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
        this.error = state.error;
      }
    });
  },
  data() {
    return {
      snackbar: false,
      error: '',
    };
  },
};
</script>

<style>
  .v-snack {
    z-index: 1002;
  }
</style>
