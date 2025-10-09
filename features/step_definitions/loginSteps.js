const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the login page', async function() {
  console.log('Navigating to login page...');
  await this.page.goto('http://localhost:3000/login');
  await this.page.waitForLoadState('networkidle');
});

When('I enter valid credentials', async function() {
  console.log('Entering valid credentials...');
  await this.page.fill('#username', 'khedi.asmoro');
  await this.page.fill('#password', '1');
});

When('I enter invalid credentials', async function() {
  console.log('Entering invalid credentials...');
  await this.page.fill('#username', 'invaliduser');
  await this.page.fill('#password', 'wrongpassword');
});

When('I click the login button', async function() {
  console.log('Clicking login button...');
  await this.page.click('button[type="submit"]');
});

When('I click the login button without entering credentials', async function() {
  console.log('Clicking login button without credentials...');
  // Clear any existing values first
  await this.page.fill('#username', '');
  await this.page.fill('#password', '');
  await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the dashboard', async function() {
  console.log('Checking redirect to dashboard...');
  await this.page.waitForURL('http://localhost:3000/', { timeout: 5000 });
  expect(this.page.url()).toBe('http://localhost:3000/');
});

Then('I should see an error message', async function() {
  console.log('Checking for error message...');
  // Look for common error message selectors
  const errorSelectors = [
    '.alert-danger',
    '.error-message',
    '[role="alert"]',
    '.text-danger'
  ];
  
  let errorFound = false;
  for (const selector of errorSelectors) {
    try {
      await this.page.waitForSelector(selector, { timeout: 2000 });
      errorFound = true;
      break;
    } catch (e) {
      // Continue to next selector
    }
  }
  
  if (!errorFound) {
    throw new Error('No error message found');
  }
});

Then('I should remain on the login page', async function() {
  console.log('Verifying still on login page...');
  expect(this.page.url()).toContain('/login');
});

Then('I should see validation error messages', async function() {
  console.log('Checking for validation errors...');
  // Check for HTML5 validation or custom validation messages
  const usernameField = this.page.locator('#username');
  const passwordField = this.page.locator('#password');
  
  // Check if fields are marked as invalid
  const usernameInvalid = await usernameField.evaluate(el => !el.validity.valid);
  const passwordInvalid = await passwordField.evaluate(el => !el.validity.valid);
  
  if (!usernameInvalid && !passwordInvalid) {
    // Look for custom validation messages
    const validationSelectors = [
      '.invalid-feedback',
      '.field-error',
      '.validation-error'
    ];
    
    let validationFound = false;
    for (const selector of validationSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 1000 });
        validationFound = true;
        break;
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!validationFound) {
      throw new Error('No validation errors found');
    }
  }
});