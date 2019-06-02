const { I, search, menu, map } = inject();

Given('I select first result', () => {
  search.selectResult();
});

When('I toggle first result favorite icon', () => {
  search.toggleResultFavorite();
});

When('close the search dialog', () => {
  search.closeDialog();
});

When('open menu', () => {
  menu.open();
});

Then('I should see {int} favorite item', (numOfResults) => {
  I.seeNumberOfElements(menu.fields.favoriteListItem, numOfResults);
});

When('I see {int} favorite item', (numOfResults) => {
  I.seeNumberOfElements(menu.fields.favoriteListItem, numOfResults);
});

When('toggle first menu favorite icon', () => {
  menu.toggleFavorite();
});

When('favorite the selected line', () => {
  map.toggleFavorite();
});

Then('I should see any favorites', () => {
  I.seeNumberOfElements(menu.fields.favoriteListItem, 0);
});
