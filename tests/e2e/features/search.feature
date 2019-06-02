Feature: Search @search
    In order to view a bus line info
    As a user
    I need to be able to search the line

Background:
    Given I am in main page

Scenario: Test search dialog
    And search button is visible
    When I click search button
    Then I should see the search dialog

Scenario: Test search input
    And search button is visible
    And I click search button
    When I see the search dialog
    Then I should be able to input "5106-21" in search

Scenario: Search for 5106-21
    And search button is visible
    And I click search button
    And I see the search dialog
    When I input "5106-21" in search
    Then I should see 2 results