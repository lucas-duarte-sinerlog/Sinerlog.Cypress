Feature: CrossCommerce - Order

Feature: Order
    Order
    Scenario: Create a Order
        Given I want to create a order
        And the account "Sinerlog" with id "1" and  exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created

    Scenario: Cancel an order
        Given I want to cancel an order
        And the account "Sinerlog" with id "1" and  exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created
        When send a cancel request
        Then the order must be canceled