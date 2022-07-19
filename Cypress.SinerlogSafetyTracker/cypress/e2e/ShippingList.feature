Feature: Shipping List

    Shipping list is ...

    Scenario: Delivery Cancel with a Open / ToIntegrate Shipping List
        Given i want to suspend a delivery
        When i set a "add-label.json" default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" default payload
        And add a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a delivery cancel request
        Then the delivery must be suspend

    Scenario: Success delivery cancel with a Shipped / Integrated Shipping List
        Given i want to suspend a delivery
        When i set a "add-label.json" default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" default payload
        And add a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a delivery cancel request
        Then the delivery must be suspend

    Scenario: Fail delivery cancel with a Shipped / Integrated Shipping List
        Given i want to suspend a delivery
        When i set a "add-label.json" default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" default payload
        And add a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a delivery cancel request
        Then the delivery must be suspend