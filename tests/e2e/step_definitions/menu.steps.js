const { I, menu } = inject();

Given('menu button is visible', () => {
  I.waitForElement(menu.fields.menuBtn);
});

When('I click menu button', () => {
  I.click(menu.fields.menuBtn);
});

Then('I should see the menu', () => {
  I.waitForVisible(menu.fields.menu);
});
