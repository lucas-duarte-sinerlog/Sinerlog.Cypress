Feature: Shipping List

    Shipping list is ...

    Scenario: #1 - Delivery Cancel with a open Shipping List
        Given i want to suspend a delivery
        And the shipping seller with id "5" exists
        When i set a "add-label.json" label default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" shipping list default payload
        And add a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a delivery cancel request
        Then the delivery must be suspend

    Scenario: Delivery cancel with a closed Shipping List
        Given i want to suspend a delivery
        And the shipping seller with id "5" exists
        When i set a "add-label.json" label default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" shipping list default payload
        And add a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a shipping list close request
        Then the shipping list must be closed
        When i send a delivery cancel request
        Then the delivery must be suspend