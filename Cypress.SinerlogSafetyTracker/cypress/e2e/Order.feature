Feature: CrossCommerce - Order
    Order API from Crosscommerce
    Scenario: Create a Order
        Given I want to create a order
        And the account "Sinerlog" with id "1" exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created
    Scenario: Cancel an order
        Given I want to cancel an order
        And the account "Sinerlog" with id "1" exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created
        When send a cancel request
        Then the order must be canceled
        When i get the order
        Then the order status must be "Canceled"

@focus 
    Scenario: Export an Order to SST as a Package
        Given i want to export an order to SST from CrossCommerce
        And the account "Sinerlog" with id "1" exists
        When i set a "add-order.json" default payload
        And send a create request
        Then the order should be created
        When i wait for an order export time
        And get the order tracking code
        Then the logistic code must not equals null
        And consult a package at SST
        Then the order must have been exported

    Scenario Outline: Order Split by value
        Given I want to split an order by item and value
        And the account "Sinerlog" with id "1" exists
        When i set a "add-order-2-items.json" default payload
        And i set a totalItems field "<totalItems>", currency "<currency>", totalAmount "<totalAmount>", totalTax "<totalTax>", totalShipping "<totalShipping>"
        And i set a first product code "<firstProductCode>" with quantity "<firstProductQuantity>", unit price "<firstProductUnitPrice>", shippingInsurance field "<shippingInsurance>"
        And i set a second product code "<secondProductCode>" with quantity "<secondProductQuantity>", unit price "<secondProductUnitPrice>", shippingInsurance field "<shippingInsurance>"
        And send a create request
        Then the order should be splited with 1 item each

        Examples:
            | totalItems | currency | totalAmount | totalShipping | firstProductCode | firstProductQuantity | firstProductUnitPrice | secondProductCode | secondProductQuantity | secondProductUnitPrice | totalTax | shippingInsurance |
            | 4000       | USD      | 4000        | 955           | PENDING          | 1                    | 3000                  | PENDING           | 1                     | 1000                   | 45       | false             |

