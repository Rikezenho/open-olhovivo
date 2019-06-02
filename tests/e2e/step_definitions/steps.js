const { I } = inject();

Before((test) => {
  // perform your code
  test.retries(3); // retry test 3 times
});

Given('I am in main page', () => {
  I.amOnPage('/');
});
