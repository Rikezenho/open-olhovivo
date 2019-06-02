Feature('Basic features');

const lineToSearch = {
  number: '5106-21',
  start: 'JD. SELMA',
  end: 'E.T. ÁGUA ESPRAIADA',
};

Before((I) => {
  I.amOnPage('/');
});

Scenario('should be possible to show and hide menu', (I, menu) => {
  menu.open();
  menu.close();
})
  .retry(3)
  .tag('@menu');

Scenario('should be possible to show and hide search dialog', (I, search) => {
  search.openDialog();
  search.closeDialog();
})
  .retry(3)
  .tag('@search');

Scenario(`should search for ${lineToSearch.number} and return 2 results`, (I, search) => {
  search.doSearch(lineToSearch.number);
  I.seeNumberOfElements(search.fields.resultItem, 2);
})
  .retry(3)
  .tag('@search');

Scenario(`should search for ${lineToSearch.number}, favorite one and see it in menu`, (I, search, menu) => {
  search.doSearch(lineToSearch.number);
  search.toggleResultFavorite();
  search.closeDialog();
  menu.open();
  I.seeNumberOfElements(menu.fields.favoriteListItem, 1);
})
  .retry(3)
  .tag('@search')
  .tag('@favorite');

Scenario(`should search for ${lineToSearch.number}, favorite one, see it in menu, then unfavorite`, (I, search, menu) => {
  search.doSearch(lineToSearch.number);
  search.toggleResultFavorite();
  search.closeDialog();
  menu.open();
  menu.toggleFavorite();
  I.wait(1);
  I.seeNumberOfElements(menu.fields.favoriteListItem, 0);
})
  .retry(3)
  .tag('@search')
  .tag('@menu')
  .tag('@favorite');

Scenario(`should search for ${lineToSearch.number} and load data in the map`, (I, search, map) => {
  search.doSearch(lineToSearch.number);
  search.selectResult();
  I.see(`${lineToSearch.number} - ${lineToSearch.start}/${lineToSearch.end}`);
})
  .retry(3)
  .tag('@search')
  .tag('@map');

Scenario(`should search for ${lineToSearch.number}, load data in the map and toggle direction`, (I, search, map) => {
  search.doSearch(lineToSearch.number);
  search.selectResult();
  I.waitForVisible(map.fields.map);
  map.toggleDirection();
  I.see(`${lineToSearch.number} - ${lineToSearch.end}/${lineToSearch.start}`);
})
  .retry(3)
  .tag('@search')
  .tag('@map');

Scenario(`should search for ${lineToSearch.number}, load data in the map and refresh when click in icon`, (I, search, map) => {
  search.doSearch(lineToSearch.number);
  search.selectResult();
  I.waitForVisible(map.fields.map);
  map.refresh();
})
  .retry(3)
  .tag('@search')
  .tag('@map')
  .tag('@refresh');

Scenario(`should search for ${lineToSearch.number}, load data in the map and then favorite line`, (I, search, map, menu) => {
  search.doSearch(lineToSearch.number);
  search.selectResult();
  I.see(`${lineToSearch.number} - ${lineToSearch.start}/${lineToSearch.end}`);
  map.toggleFavorite();
  menu.open();
  I.seeNumberOfElements(menu.fields.favoriteListItem, 1);
})
  .retry(3)
  .tag('@search')
  .tag('@map')
  .tag('@menu')
  .tag('@favorite');
