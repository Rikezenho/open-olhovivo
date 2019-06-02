const { I, busItem } = inject();

module.exports = {
  fields: {
    favoriteList: '#menu-favorites',
    favoriteListItem: '#menu-favorites .bus-line',
    menuBtn: '#menu-trigger',
    menu: '#menu',
  },
  open() {
    I.waitForElement(this.fields.menuBtn);
    I.click(this.fields.menuBtn);
    I.waitForVisible(this.fields.menu);
  },
  close() {
    I.click('.v-overlay--active');
    I.waitForInvisible('.v-overlay--active');
  },
  toggleFavorite(selector = this.fields.favoriteListItem) {
    busItem.toggleFavorite(selector);
  },
};
