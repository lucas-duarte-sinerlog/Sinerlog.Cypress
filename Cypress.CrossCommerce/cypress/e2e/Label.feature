Feature: Shipping Labels
    Shipping Labels from Sinerlog envios.
    Printed document that is attached to a parcel containing information about the shipment such as tracking code and addresses
    Scenario Outline: Create a label with delivery type unavailable in zipcode address
        Given I want to create a label
        And the following Shipping Company exists
            | Id | Name     |
            | 3  | Correios |
        And the following service exists in Shipping Company above
            | Id | Name     | SinerlogServiceType | ServiceExternalCodeId | ServiceExternalCode |
            | 4  | Sedex 10 | Priority            | 162016                | 03158               |
        When i set "<DeliveryType>" delivery type
        And a "<City>" zip code "<ZipCode>"
        And send a create request
        Then the label should be created

        Examples:
            | DeliveryType | City   | ZipCode  |
            | Priority     | Manaus | 27949316 |