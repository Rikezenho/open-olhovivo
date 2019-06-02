Feature: menu @menu
    In order to view my favorite lines
    As a user
    I need to be able to open the menu

Scenario: test menu dialog
    Given I am in main page
    And menu button is visible
    When I click menu button
    Then I should see the menu