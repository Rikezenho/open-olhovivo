<template>
  <v-container>
    <div v-if="!selectedLine.lineId">Busque uma linha para começar.</div>
    <div v-else>
      <div class="line-title-container">
        <h6 class="title line-title" id="map-line-title">
          {{ selectedLine.number }} - {{ selectedLine.from }}/{{ selectedLine.to }}
        </h6>
      </div>
      <l-map :bounds="bounds" :zoom="zoom" :center="initialLocation" id="map">
        <l-control class="custom-control">
          <p @click="loadMapAdditionalData" id="map-refresh"><v-icon>refresh</v-icon></p>
        </l-control>
        <l-polyline :lat-lngs="[latLngPaths]" />
        <l-tile-layer
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"/>
          <l-marker
            v-for="vehicle in positions"
            :lat-lng="[vehicle.py, vehicle.px]"
            :key="vehicle.p">
            <l-popup :content="popupContent(vehicle)"/>
          </l-marker>
          <l-marker
            v-if="userCoords.length"
            :lat-lng="userCoords"
            :icon="userIcon"
            key="user_position" />
      </l-map>
      <v-speed-dial
        v-model="fab"
        :bottom="true"
        :right="true"
        direction="top"
        transition="slide-x-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="indigo darken-2"
            dark
            fab
            id="map-speed-dial-toggle"
          >
            <v-icon>more_horiz</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="orange"
          @click="$utils.toggleFavorite(selectedLine)"
          id="map-toggle-favorite"
        >
          <v-icon>{{ $utils.getFavoritedIcon(selectedLine.lineId) }}</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          @click="toggleDirection"
          id="map-toggle-direction"
        >
          <v-icon>swap_horiz</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
  </v-container>
</template>

<script>
import {
  LMap, LPolyline, LTileLayer, LPopup, LMarker, LControl,
} from 'vue2-leaflet';
import moment from 'moment';
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import configs from '../configs';
import constants from '../store/constants';

const { L } = window;

export default {
  name: 'OpenOlhoVivoMap',
  components: {
    LMap,
    LPolyline,
    LTileLayer,
    LPopup,
    LMarker,
    LControl,
  },
  created() {
    if (this.selectedLine && this.selectedLine.lineId) {
      this.loadMapAdditionalData();
    }
  },
  mounted() {
    this.getUserPosition();
    this.$store.subscribe((mutation) => {
      if (mutation.type === constants.UNBLOCK_UI) {
        this.fitPolyline();
      }
      if (mutation.type === constants.SELECT_LINE) {
        this.loadMapAdditionalData();
      }
    });
  },
  data() {
    return {
      fab: false,
      initialLocation: configs.initialMapLocation,
      layersPosition: 'topright',
      tileProvider: configs.tileProvider,
      zoom: 13,
      bounds: L.latLngBounds(this.latLngPathsObject),
      alerts: [],
      userIcon: L.icon({
        iconUrl: require('../assets/marker-me.png'),
        shadowUrl: require('../assets/marker-shadow.png'),
        iconSize: [25, 37],
        shadowSize: [41, 41],
        shadowAnchor: [14, 25],
      }),
      userCoords: [],
    };
  },
  methods: {
    ...mapMutations([
      constants.TOGGLE_LINE_DIRECTION,
    ]),
    ...mapActions([
      constants.GET_LINE_ROUTE_AND_POSITIONS,
    ]),
    fitPolyline() {
      const bounds = L.latLngBounds(this.latLngPathsObject);
      this.bounds = bounds;
    },
    popupContent(vehicle) {
      const lastUpdate = moment(vehicle.ta);
      const timeElapsed = moment().diff(lastUpdate, 'seconds');
      return `
      <strong>Última atualização:</strong> ${lastUpdate.format('HH:mm:ss')} (${timeElapsed}s atrás)<br/>
      <strong>Prefixo do veículo:</strong> ${vehicle.p}<br/>
      <strong>Acessível?</strong> ${vehicle.a ? 'Sim' : 'Não'}
      `;
    },
    loadMapAdditionalData() {
      this[constants.GET_LINE_ROUTE_AND_POSITIONS](this.selectedLine);
    },
    toggleDirection() {
      this[constants.TOGGLE_LINE_DIRECTION]();
      this.loadMapAdditionalData();
    },
    getUserPosition() {
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
          this.userCoords = [position.coords.latitude, position.coords.longitude];
        }, err => console.log(err));
      }
    },
  },
  computed: {
    ...mapState([
      'selectedLine',
      'positions',
      'latLngPaths',
    ]),
    ...mapGetters([
      'latLngPathsObject',
    ]),
  },
};
</script>

<style lang="scss">
  .vue2leaflet-map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  .v-speed-dial {
    z-index: 1001;
    position: fixed;
  }
  .line-title-container {
    position: fixed;
    bottom: 20px;
    left: 10px;
    right: 90px;
    z-index: 1;
    text-align: left;

    .line-title {
      display: inline-block;
      background: #FFF;
      padding: 15px;
    }
  }
  .custom-control {
    background: #FFF;
    padding: 10px;
    cursor: pointer;

    p { margin: 0; padding: 0; }

    &:hover {
      background: #EFEFEF;
    }
  }
</style>
