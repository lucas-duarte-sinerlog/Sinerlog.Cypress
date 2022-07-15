Feature: CrossCommerce - Order
    Order API from Crosscommerce
    Scenario: Create a Order
        Given I want to create a order
        And the account "Sinerlog" with id "1" and exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created

    Scenario: Cancel an order
        Given I want to cancel an order
        And the account "Sinerlog" with id "1" and exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created
        When send a cancel request
        Then the order must be canceled

    Scenario Outline: Order export to SST
        Given i want to export an order to SST from CrossCommerce
        And the account "Sinerlog" with id "1" and exists
        When i set a "add-order.json" default payload
        And set a field "X"
        And send a create request
        Then the order should be created
        When i wait for an order export time
        And consult an order at SST
        Then the order must have been exported