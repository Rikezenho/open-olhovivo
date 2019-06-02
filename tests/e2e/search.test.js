Feature('Basic features');

const lineToSearch = '5106-21';

Before((I, search) => {
  I.amOnPage('/');
  search.openDialog();
  search.doSearch(lineToSearch);
  I.waitForElement(search.fields.resultItem, 5);
});

Scenario(`should search for ${lineToSearch} and return 2 results`, (I, search) => {
  I.seeNumberOfElements(search.fields.resultItem, 2);
}).retry(3);

Scenario(`should search for ${lineToSearch}, favorite one and see it in menu`, (I, search, menu) => {
  search.toggleResultFavorite();
  search.closeDialog();
  menu.open();
  I.seeNumberOfElements(menu.fields.favoriteListItem, 1);
}).retry(3);

Scenario(`should search for ${lineToSearch}, favorite one, see it in menu, then unfavorite`, (I, search, menu) => {
  search.toggleResultFavorite();
  search.closeDialog();
  menu.open();
  menu.toggleFavorite();
  I.wait(1);
  I.seeNumberOfElements(menu.fields.favoriteListItem, 0);
}).retry(3);
