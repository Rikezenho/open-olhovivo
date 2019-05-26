export default {
  latLngPathsObject: state => state.latLngPaths.map(
    latLng => ({ lat: latLng[0], lng: latLng[1] }),
  ),
};
