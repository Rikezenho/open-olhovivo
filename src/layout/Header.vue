<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      clipped
      app
    >
      <v-list>
        <v-list-tile>
            <v-list-tile-title>Open OlhoVivo</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :href="repositoryUrl" target="_blank">
            <v-list-tile-action>
              <v-icon>open_in_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Github</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>OPEN</span><span class="font-weight-light"> OLHO VIVO</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items dense>
        <v-btn flat @click="buscaLinhasDialog = true"><v-icon>search</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="buscaLinhasDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="buscaLinhasDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Busca de linhas</v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile>
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6 offset-md3>
                  <form>
                    <v-text-field
                      v-model="search"
                      label="Busca"
                      required
                      @input="handleInput"
                      block
                    ></v-text-field>
                  </form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader v-if="linesFound().length">
          <v-subheader>Resultados encontrados</v-subheader>
          <v-list-tile avatar v-for="line in linesFound()" :key="line.cl" @click="selectLine(line)">
            <v-list-tile-avatar>
              <v-icon>directions_bus</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ line.lt }}-{{ line.tl }} - {{ line.sl === 1 ? 'IDA' : 'VOLTA' }} {{ line.lc ? '(CIRCULAR)' : '' }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                ORIGEM: {{ line.sl === 1 ? line.tp : line.ts }}<br/>
                DESTINO: {{ line.sl === 1 ? line.ts : line.tp }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { repository } from '../../package.json';
import { constants } from '../store';
import functions from '../utils/functions';

const { normalizeLineData } = functions;

export default {
  name: 'Header',
  data() {
    return {
      search: '',
      drawer: false,
      repositoryUrl: repository.url,
      buscaLinhasDialog: false,
    };
  },
  methods: {
    searchLines() {
      this.$store.dispatch(constants.SEARCH_LINES, this.search);
    },
    handleInput() {
      if (this.search.length >= 4) {
        this.searchLines();
      }
    },
    linesFound() {
      return this.$store.getters.linesFound;
    },
    selectLine(line) {
      this.buscaLinhasDialog = false;
      const lines = this.linesFound();
      const lineBack = lines.filter(item => item.lt === line.lt
        && item.tl === line.tl
        && item.sl !== line.sl)[0];

      this.$store.dispatch(constants.SELECT_LINE, {
        going: normalizeLineData(line),
        back: normalizeLineData(lineBack),
      });
    },
  },
};
</script>

<style lang="scss">
  .v-navigation-drawer {
    z-index: 9999999;
  }
  .v-overlay {
    z-index: 9999998;
  }
  .v-dialog__content {
    z-index: 9999997 !important;
  }
  .v-toolbar {
    z-index: 9999996;
  }
</style>
