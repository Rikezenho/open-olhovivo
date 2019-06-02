const { I } = inject();

module.exports = {
  fields: {
    loading: '#loading-overlay',
  },
  waitUntilFinishLoad() {
    I.waitForInvisible(this.fields.loading, 10);
  },
};
