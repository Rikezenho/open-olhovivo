const { I, app, map } = inject();

When('I see loaded map', () => {
  I.waitForVisible(map.fields.map, 10);
});

When('I click toggle direction button', () => {
  map.toggleDirection();
});

When('I click refresh button', () => {
  map.refresh();
});

Then('I should see {string} in map title', (title) => {
  I.see(title);
});

Then('It should refresh', () => {
  app.waitUntilFinishLoad();
});
