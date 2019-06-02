const { I } = inject();

module.exports = {
  fields: {
    favorite: '.bus-favorite-toggle',
  },
  toggleFavorite(baseSelector) {
    I.click(`${baseSelector} ${this.fields.favorite}`);
    I.wait(1);
  },
};
