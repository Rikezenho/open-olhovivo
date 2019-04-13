import Vue from 'vue';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './plugins/vuetify';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('./assets/marker-icon-2x.png'),
  iconUrl: require('./assets/marker-icon.png'),
  shadowUrl: require('./assets/marker-shadow.png'),
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
