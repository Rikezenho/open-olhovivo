Feature: Favorites @favorite
    In order to reach lines' info easily
    As a user
    I need to be able to favorite the lines

Background:
    Given I am in main page
    And I search for "5106-21"

Scenario: Favorite it and see it in menu
    When I toggle first result favorite icon
    And close the search dialog
    And open menu
    Then I should see 1 favorite item

Scenario: Favorite the first result, see it in menu, then unfavorite
    When I toggle first result favorite icon
    And close the search dialog
    And open menu
    And I see 1 favorite item
    And toggle first menu favorite icon
    Then I should see any favorites

Scenario: Select the first result, then favorite and see it in menu
    And I select first result
    When I see loaded map
    And favorite the selected line
    And open menu
    Then I should see 1 favorite item