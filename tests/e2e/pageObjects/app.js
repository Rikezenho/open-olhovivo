const { I } = inject();

module.exports = {
  fields: {
    loading: '#loading-overlay',
  },
  waitUntilFinishLoad() {
    I.wait(1);
    I.waitForInvisible(this.fields.loading);
  },
};
