Feature: Order
    Order
    Scenario: #1 - Create a Order
        Given I want to create a order
        And the following account exists
            | Id | Name     |
            | 1  | Sinerlog |
        When i set a default request payload
        And send a create request
        Then the order should be created

    Scenario: #2 - Cancel an order
        Given I want to cancel an order
        And the following account exists
            | Id | Name     |
            | 1  | Sinerlog |
        And the following webhook config also exists
            | AccountId | Url                                                       |
            | 1         | https://webhook.site/1bd9166d-092b-4712-be82-2433a10db418 |
        When i create an order
        And cancel this order
        Then the order must be canceled
        And the system must send a cancelation webhook