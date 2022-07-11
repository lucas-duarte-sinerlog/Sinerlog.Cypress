Feature: Wallet

    Wallet is ...

    Scenario Outline: Wallet transactions from Packages
        Given i want to do a package transaction
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        And the following service line also exists
            | ServiceLine | Field2 |
            | X           | Y      |
        When i get the before package transaction tenant balance
        And set the following data to create a package:
        service type: "<ServiceType>",
        currency: "<Currency>",
        delivery type: "<DeliveryType>",
        And a province and zipcode that "<ContainsIcms?>" like "<Province>" and "<Zipcode>"
        And send a package create request
        And wait for the Wallet integration
        And get the after transaction tenant balance
        Then the balance diff must be "<BalanceDiff>"
