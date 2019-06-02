Feature: Map @map
    In order to view map infos visually
    As a user
    I need to be able to interact with the map

Background:
    Given I am in main page
    And I search for "5106-21"

Scenario: Select the first result and view it in map
    When I select first result
    Then I should see "5106-21 - JD. SELMA/E.T. ÁGUA ESPRAIADA" in map title

Scenario: Select the first result, view it in map and refresh data clicking in the icon
    And I select first result
    And I see loaded map
    When I click refresh button
    Then It should refresh

Scenario: Select the first result, view it in map and toggle direction
    And I select first result
    And I see loaded map
    When I click toggle direction button
    Then I should see "5106-21 - E.T. ÁGUA ESPRAIADA/JD. SELMA" in map title