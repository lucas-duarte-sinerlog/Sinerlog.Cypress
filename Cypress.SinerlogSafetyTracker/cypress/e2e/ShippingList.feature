Feature: Shipping List

    Shipping list is ...

    Scenario: #1 - Delivery Cancel with a opened Shipping List
        Given i want to suspend a delivery
        And the shipping seller with id "5" exists
        When i set a "add-label.json" label default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" shipping list default payload
        And include a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a delivery cancel request with a newly included label
        Then the delivery must be suspended

    Scenario: #2 - Delivery Cancel with a closed Shipping List
        Given i want to suspend a delivery
        And the shipping seller with id "5" exists
        When i set a "add-label.json" label default payload
        And send a create label request
        Then the label should be created
        When i set a "add-shippingList.json" shipping list default payload
        And include a newly created label
        And send a shipping list create request
        Then the shipping list must be created
        When i send a shipping list close request
        Then the shipping list must be closed
        When i send a delivery cancel request with a newly included label
        Then the delivery must not be suspend


    Scenario: #3 - Delivery Cancel with a Shipping List created by a Label Express
        Given i want to suspend a delivery
        And the shipping seller with id "5" exists
        When i set a "add-label-express.json" label default payload
        And send a label express create request
        Then the label express should be created
        When i send a delivery cancel request with a newly included label
        Then the delivery must not be suspend

    Scenario: #4 - Get a Shipping List exported for Amazon S3
        Given I want to get a Shipping List
        And this Shipping List was exported for Amazon S3
        When i send a get request with a Shipping List code "DG997771375BR"
        Then the Shipping List should be got
    Scenario: #5 - Get a Shipping List not exported for Amazon S3
        Given I want to get a Shipping List
        And this Shipping List was not exported for Amazon S3
        When i send a get request with a Shipping List code "SO244586125BR"
        Then the Shipping List should be got

    Scenario: #6 - Create a Shipping List