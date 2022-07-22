Feature: Shipping Labels
    Shipping Labels from Sinerlog envios.
    Printed document that is attached to a parcel containing information about the shipment such as tracking code and addresses
    Scenario Outline: Create a label with delivery type unavailable in zipcode address
        Given I want to create a label
        And the Shipping Company with id "3" and name "Correios" exists
        And the service with id "3" named "Sedex 10" with type "Priority" and external object "{\"Id":\"162016\",\"Code\":\"03158\"}" existis in Shipping Company above
        When i set a "add-label.json" label default payload
        When i set "<DeliveryType>" delivery type
        And a "<City>" zip code "<ZipCode>"
        And send a create request
        Then the label should be created

        Examples:
            | DeliveryType | City   | ZipCode  |
            | Priority     | Manaus | 27949316 |

    Scenario: Create a default Label
        Given I want to create a label
        And the Shipping Company with id "3" and name "Correios" exists
        When i set a "add-label.json" label default payload
        And send a label create request
        Then the label should be created

    Scenario: Create a default Label express
        Given I want to create a label
        And the Shipping Company with id "3" and name "Correios" exists
        When i set a "add-label-express.json" label default payload
        And send a label express create request
        Then the label should be created

    Scenario: Get a label exported for Amazon S3
        Given I want to get a label
        And this label was exported for Amazon S3
        When i send a get request with a label code "DG997771375BR"
        Then the label should be got
    Scenario: Get a label not exported for Amazon S3
        Given I want to get a label
        And this label was not exported for Amazon S3
        When i send a get request with a label code "SO244586125BR"
        Then the label should be got



