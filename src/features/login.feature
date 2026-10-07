
Feature: SauceDemo Login
  As a user of SauceDemo
  I want to log in with valid and invalid credentials
  So that I can verify access to the product inventory

  Background:
    Given the user is on the login page

  Scenario: Successful login with standard user
    When the user logs in with "standard_user" and "secret_sauce"
    Then the user should see the inventory page
    And the inventory should display 6 products

  Scenario: Failed login with locked out user
    When the user logs in with "locked_out_user" and "secret_sauce"
    Then the user should see an error message containing "Sorry, this user has been locked out"

  Scenario: Failed login with invalid credentials
    When the user logs in with "invalid_user" and "wrong_password"
    Then the user should see an error message containing "Username and password do not match"

  Scenario Outline: Login with multiple user types
    When the user logs in with "<username>" and "<password>"
    Then the login result should be "<result>"

    Examples:
      | username                | password     | result  |
      | standard_user           | secret_sauce | success |
      | locked_out_user         | secret_sauce | error   |
      | problem_user            | secret_sauce | success |
      | performance_glitch_user | secret_sauce | success |

