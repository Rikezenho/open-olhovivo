<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>OPEN</span><span class="font-weight-light"> OLHO VIVO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/Rikezenho/open-olhovivo"
        target="_blank"
      >
        <span class="mr-2">Fork me on Github!</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <open-olho-vivo-map lineId="1972" lineNumber="5106-21" lineDirection="going" />
    </v-content>
  </v-app>
</template>

<script>
import OpenOlhoVivoMap from './components/OpenOlhoVivoMap.vue';

export default {
  name: 'App',
  components: {
    OpenOlhoVivoMap,
  },
  data() {
    return {
      //
    };
  },
};
</script>
