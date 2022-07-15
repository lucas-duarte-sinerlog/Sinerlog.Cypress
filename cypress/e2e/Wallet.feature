Feature: Wallet

    Wallet is ...

    Scenario Outline: Transactions from package creation
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "<ServiceType>", currency: "<Currency>", delivery type: "<DeliveryType>"
        And a province and zipcode that "<ContainsIcms?>" ICMS like "<Province>" and "<Zipcode>"
        And send a package create request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "<BalanceDiff>"

        Examples:
            | ServiceType | Currency | DeliveryType | Province | Zipcode   | ContainsIcms? | BalanceDiff |
            | DDP         | USD      | EX           | MG       | 22775-120 | contains      | 100         |

    Scenario: Transactions from package delete
        Given i want to do a package delete transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "DDP", currency: "USD", delivery type: "<DeliveryType>"
        And a province and zipcode that "contains" ICMS like "MG" and "22775-120"
        And send a package create request
        And send a package delete request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "0"

    Scenario: Wallet transactions from package weight update
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "DDP", currency: "USD", delivery type: "<DeliveryType>"
        And a province and zipcode that "contains" ICMS like "MG" and "22775-120"
        And send a package create request
        And i set the package weight "600"
        And send a package update request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "X"

    Scenario: Wallet transactions from package address update
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "DDP", currency: "USD", delivery type: "<DeliveryType>"
        And a province and zipcode that "contains" ICMS like "MG" and "22775-120"
        And send a package create request
        And i set the package address that not contains ICMS like "Sao Paulo"
        And send a package update request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "X"

    Scenario: Wallet transactions from package item price update
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "DDP", currency: "USD", delivery type: "<DeliveryType>"
        And a province and zipcode that "contains" ICMS like "MG" and "22775-120"
        And send a package create request
        And i set the package item price "X"
        And send a package update request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "Y"

    Scenario: Wallet transactions from package insurance update
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And set the following data to create a package: service type: "DDP", currency: "USD", delivery type: "<DeliveryType>"
        And a province and zipcode that "contains" ICMS like "MG" and "22775-120"
        And send a package create request
        And i set the package insurance "true"
        And send a package update request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "X"

    Scenario: Debit transaction
        Given i want to do a debit transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And i set a debit value "100"
        And i send a debit create request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "-100"

    Scenario: Credit transaction
        Given i want to do a credit transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before transaction tenant balance
        And i set a credit value "100"
        And i send a credit create request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "100"