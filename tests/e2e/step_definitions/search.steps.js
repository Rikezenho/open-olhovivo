const { I, search } = inject();

Given('search button is visible', () => {
  I.waitForElement(search.fields.dialogBtn);
});

Given('I search for {string}', (line) => {
  search.doSearch(line);
});

When('I click search button', () => {
  I.click(search.fields.dialogBtn);
});

Then('I should see the search dialog', () => {
  I.waitForElement(search.fields.dialog);
});

When('I see the search dialog', () => {
  I.waitForElement(search.fields.dialog);
});

Then('I should be able to input {string} in search', (line) => {
  I.fillField(search.fields.input, line);
});

When('I input {string} in search', (line) => {
  I.fillField(search.fields.input, line);
});

Then('I should see {int} results', (numOfResults) => {
  I.seeNumberOfElements(search.fields.resultItem, numOfResults);
});
