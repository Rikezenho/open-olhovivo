<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <l-map :bounds="bounds" :zoom="zoom" :center="initialLocation" style="height: 80%;">
        <l-control class="custom-control">
          <p @click="loadMap">Reload</p>
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
          v-for="vehicle in vehicles"
          :lat-lng="[vehicle.py, vehicle.px]"
          :key="vehicle.p">
          <l-popup :content="popupContent(vehicle)"/>
        </l-marker>
      </l-map>
    </v-layout>
  </v-container>
</template>

<script>
import {
  LMap, LPolyline, LTileLayer, LPopup, LMarker, LControl,
} from 'vue2-leaflet';
import axios from 'axios';

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
    this.loadMap();
    setInterval(this.loadMap, 10 * 1000);
  },
  props: {
    lineId: String,
    lineNumber: String,
    lineDirection: String,
  },
  data() {
    return {
      initialLocation: [-23.5486, -46.6392],
      latLngPaths: [],
      vehicles: [],
      layersPosition: 'topright',
      tileProvider: {
        name: 'OpenStreetMap',
        visible: true,
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      zoom: 13,
      bounds: L.latLngBounds(this.latLngPathsObject),
    };
  },
  methods: {
    getLatLngPathsFromLine(lineNumber, direction) {
      axios.get(`http://localhost:3000/linesSpTrans/${lineNumber}/route/${direction}`)
        .then(({ data }) => {
          if (data.status) {
            const hasData = !!data.data.features.length;
            if (hasData) {
              this.latLngPaths = data.data.features[0].geometry.coordinates[0].map(
                latLng => [latLng[1], latLng[0]],
              );
              this.fitPolyline();
            }
          }
        })
        .catch(e => console.log(e));
    },
    setPositionMarkers(lineId) {
      axios.get(`http://localhost:3000/lines/${lineId}/position`)
        .then(({ data }) => {
          if (data.status) {
            const hasData = !!data.data.vs.length;
            if (hasData) {
              this.vehicles = data.data.vs;
            }
          }
        })
        .catch(e => console.log(e));
    },
    fitPolyline() {
      const bounds = L.latLngBounds(this.latLngPathsObject);
      this.bounds = bounds;
    },
    popupContent(vehicle) {
      return `<strong>Prefixo do veículo:</strong> ${vehicle.p}<br/><strong>Acessível?</strong> ${vehicle.a ? 'Sim' : 'Não'}`;
    },
    loadMap() {
      this.getLatLngPathsFromLine(this.lineNumber, this.lineDirection);
      this.setPositionMarkers(this.lineId);
    },
  },
  computed: {
    latLngPathsObject() {
      return this.latLngPaths.map(
        latLng => ({ lat: latLng[0], lng: latLng[1] }),
      );
    },
  },
};
</script>

<style lang="scss">
  .vue2leaflet-map {
    min-height: 600px;
  }
  .custom-control {
    background: #FFF;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;

    p { margin: 0; padding: 0; }

    &:hover {
      background: #EFEFEF;
    }
  }
</style>
