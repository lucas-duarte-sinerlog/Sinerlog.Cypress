Feature: Order
    Order
    Scenario: #1 - Create a default Order
        Given the following account exists
            | Id | Name     |
            | 1  | Sinerlog |
        And I want to create a order
        When i set a default request payload
        And send a create request
        Then the order should be created

    Scenario: #2 - Create an default Order and cancel
        Given the following account exists
            | Id | Name     |
            | 1  | Sinerlog |
        And I want to create a order
        When i set a default request payload
        And send a create request
        Then the order should be created
        When i wait for a Logistc Order
        And i sent a cancel request
        Then the order must be canceled
