<template>
  <v-container>
    <h6 class="title line-title">
      {{ currentLine().number }} - {{ currentLine().from }}/{{ currentLine().to }}
    </h6>
    <l-map :bounds="bounds" :zoom="zoom" :center="initialLocation">
      <l-control class="custom-control">
        <p @click="loadMapAdditionalData"><v-icon>refresh</v-icon></p>
      </l-control>
      <l-polyline :lat-lngs="[latLngPaths()]" />
      <l-tile-layer
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"/>
      <l-marker
        v-for="vehicle in vehicles()"
        :lat-lng="[vehicle.py, vehicle.px]"
        :key="vehicle.p">
        <l-popup :content="popupContent(vehicle)"/>
      </l-marker>
    </l-map>
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="indigo darken-2"
          dark
          fab
        >
          <v-icon>arrow_drop_up</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>star_border</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="toggleDirection"
      >
        <v-icon>swap_horiz</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
import {
  LMap, LPolyline, LTileLayer, LPopup, LMarker, LControl,
} from 'vue2-leaflet';
import configs from '../configs';
import { constants } from '../store';

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
    this.loadMapAdditionalData();
  },
  mounted() {
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
    };
  },
  methods: {
    getLatLngPathsFromLine(lineNumber, direction) {
      this.$store.dispatch(constants.GET_LINE_ROUTE, {
        lineNumber,
        direction,
      });
    },
    setPositionMarkers(lineId) {
      this.$store.dispatch(constants.GET_LINE_POSITIONS, {
        lineId,
      });
    },
    fitPolyline() {
      const bounds = L.latLngBounds(this.latLngPathsObject);
      this.bounds = bounds;
    },
    popupContent(vehicle) {
      return `<strong>Prefixo do veículo:</strong> ${vehicle.p}<br/><strong>Acessível?</strong> ${vehicle.a ? 'Sim' : 'Não'}`;
    },
    loadMapAdditionalData() {
      this.getLatLngPathsFromLine(this.currentLine().number, this.currentLine().direction);
      this.setPositionMarkers(this.currentLine().lineId);
    },
    toggleDirection() {
      this.$store.dispatch(constants.TOGGLE_LINE_DIRECTION);
    },
    currentLine() {
      return this.$store.getters.selectedLine;
    },
    vehicles() {
      return this.$store.getters.positions;
    },
    latLngPaths() {
      return this.$store.getters.latLngPaths;
    },
  },
  computed: {
    latLngPathsObject() {
      return this.latLngPaths().map(
        latLng => ({ lat: latLng[0], lng: latLng[1] }),
      );
    },
  },
};
</script>

<style lang="scss">
  .vue2leaflet-map {
    min-height: 420px;
    margin-top: 20px;
  }
  .v-speed-dial {
    z-index: 1001;
    position: fixed;
  }
  .line-title {
    margin-bottom: 20px;
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
