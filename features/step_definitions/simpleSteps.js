const { Given, When, Then } = require('@cucumber/cucumber');

Given('I have a browser', function() {
  console.log('Browser is ready');
});

When('I navigate to a page', function() {
  console.log('Navigated to page');
});

Then('I should see the page', function() {
  console.log('Page loaded');
});