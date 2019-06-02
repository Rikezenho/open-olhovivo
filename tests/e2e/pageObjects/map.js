const { I, app } = inject();

module.exports = {
  fields: {
    map: '#map',
    lineTitle: '#map-line-title',
    speedDialToggle: '#map-speed-dial-toggle',
    toggleDirection: '#map-toggle-direction',
    toggleFavorite: '#map-toggle-favorite',
    refresh: '#map-refresh',
  },
  toggleDirection() {
    I.click(this.fields.speedDialToggle);
    I.waitForVisible(this.fields.toggleDirection);
    I.click(this.fields.toggleDirection);
    app.waitUntilFinishLoad();
  },
  toggleFavorite() {
    I.click(this.fields.speedDialToggle);
    I.waitForVisible(this.fields.toggleFavorite);
    I.click(this.fields.toggleFavorite);
    app.waitUntilFinishLoad();
  },
  refresh() {
    I.click(this.fields.refresh);
  },
};
