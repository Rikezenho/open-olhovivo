Feature: search @search
    In order to view a bus line info
    As a user
    I need to be able to search the line

Scenario: test search dialog
    Given I am in main page
    And search button is visible
    When I click search button
    Then I should see the search dialog