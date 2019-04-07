const API_BASE_URL = 'https://open-olhovivo-api.rikezenho.now.sh';

export default {
  API_BASE_URL,
  initialMapLocation: [-23.5486, -46.6392],
  tileProvider: {
    name: 'OpenStreetMap',
    visible: true,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
};
