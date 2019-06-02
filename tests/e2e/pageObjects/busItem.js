const { I } = inject();

module.exports = {
  fields: {
    favorite: '.bus-favorite-toggle',
  },
  toggleFavorite(baseSelector) {
    I.wait(1);
    I.click(`${baseSelector} ${this.fields.favorite}`);
  },
};
