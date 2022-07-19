Feature: Shipping List
    Shipping list is ...

    Scenario: Delivered Suspend
        Given i want to suspend a delivery
        When i set a "add-label.json" default payload
        And send a create label request
        Then the label should be created
        When i set a "x.json" default payload
        And send a create request
        Then the shipping list must be created
        When i send a delivery cancel request
        Then the delivery must be suspend