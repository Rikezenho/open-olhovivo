const { I, busItem } = inject();

module.exports = {
  fields: {
    dialogBtn: '#search-dialog-trigger',
    closeDialog: '#search-dialog-close',
    dialog: '#search-dialog',
    input: '#search-input',
    results: '#search-results',
    resultItem: '#search-results .bus-line',
  },
  openDialog() {
    I.waitForElement(this.fields.dialogBtn);
    I.click(this.fields.dialogBtn);
    I.waitForVisible(this.fields.dialog);
  },
  closeDialog() {
    I.click(this.fields.closeDialog);
  },
  doSearch(term) {
    I.waitForElement(this.fields.input);
    I.fillField(this.fields.input, term);
    I.wait(1);
  },
  selectResult(selector = this.fields.resultItem) {
    I.click(selector);
  },
  toggleResultFavorite(selector = this.fields.resultItem) {
    busItem.toggleFavorite(selector);
  },
};
