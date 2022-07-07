Feature: Order
    Order
    Scenario: Create a default Order
        Given I want to create a order
        And the following account exists
            | Id | Name     |
            | 1  | Sinerlog |
        When i set a default request payload
        And send a create request
        Then the order should be created