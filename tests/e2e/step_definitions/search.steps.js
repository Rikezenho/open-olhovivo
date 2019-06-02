const { I, search } = inject();

Given('search button is visible', () => {
  I.waitForElement(search.fields.dialogBtn);
});

When('I click search button', () => {
  I.click(search.fields.dialogBtn);
});

Then('I should see the search dialog', () => {
  I.waitForElement(search.fields.dialog);
});
