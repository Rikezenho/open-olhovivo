<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-tile>
            <v-list-tile-title>Open OlhoVivo</v-list-tile-title>
        </v-list-tile>
        <v-list-group
        prepend-icon="star"
        value="true"
        v-if="favorites().length">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Favoritos</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-bus-item
          v-for="favorite in favorites()"
          :key="favorite.lineId"
          :line="favorite"
          :onClick="closeDrawer" />
        </v-list-group>
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
        <v-btn flat @click="openSearchDialog"><v-icon>search</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog
    v-model="searchDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeSearchDialog">
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
          <v-subheader>{{ linesFound().length }} resultado(s) encontrado(s)</v-subheader>
          <v-bus-item
          v-for="line in linesFound()"
          :key="line.cl"
          :line="line"
          :onClick="closeSearchDialog" />
        </v-list>
        <v-list three-line subheader v-else>
          <v-subheader>Nenhum resultado encontrado.</v-subheader>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { repository } from '../../package.json';
import { constants } from '../store';
import BusItem from '../components/BusItem.vue';

export default {
  name: 'Header',
  components: {
    'v-bus-item': BusItem,
  },
  data() {
    return {
      search: '',
      drawer: false,
      repositoryUrl: repository.url,
      searchDialog: this.$store.getters.searchDialog,
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
    favorites() {
      return this.$store.getters.favorites;
    },
    openSearchDialog() {
      this.searchDialog = true;
    },
    closeSearchDialog() {
      this.searchDialog = false;
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
  .v-navigation-drawer {
    z-index: 9999999;

    .v-list__tile--avatar {
      height: 80px;
    }
  }
  .v-overlay {
    z-index: 9999998;
  }
  .v-dialog__content {
    z-index: 9999997 !important;
  }
  .v-toolbar {
    z-index: 9999996;

    .v-toolbar__items .v-btn {
      min-width: auto;
    }
  }
</style>
