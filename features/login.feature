Feature: User Authentication
  As a user
  I want to log into the packing cost calculator
  So that I can access the application features

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard

  @login @negative
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @login @validation
  Scenario: Login with empty credentials
    Given I am on the login page
    When I click the login button without entering credentials
    Then I should see validation error messages