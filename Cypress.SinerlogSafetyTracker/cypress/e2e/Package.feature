Feature: Package
    Package
    Scenario: Create a default Package
        Given I want to create a package
        And the following tenant exists
            | Tenant   | TenantCode |
            | TesteHub | teste-hub  |
        When i set a default payload
        And send a create request
        Then the package should be created