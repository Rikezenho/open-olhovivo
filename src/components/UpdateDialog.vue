<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
    >
    <v-card>
      <v-card-title class="headline">Nova versão disponível</v-card-title>
      <v-card-text>
        Existe um update disponível.<br/>Atualizar agora?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="dialog = false"
        >
          Agora não
        </v-btn>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="acceptUpdate"
        >
          Atualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UpdateDialog',
  created() {
    document.addEventListener('updateAvailable', ({ detail }) => {
      this.desiredVersion = detail.version;
      this.dialog = true;
    });
  },
  data() {
    return {
      desiredVersion: '',
      dialog: false,
    };
  },
  methods: {
    acceptUpdate() {
      window.location.reload();
    },
  },
};
</script>
