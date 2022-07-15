Feature: Package
    Package
    Scenario: Create a DDP Package
        Given I want to create a package
        And a tenant "Teste HUB" with code "teste-hub" exists
        When i set a delivery tax "1" "DDP"
        And send a create request
        Then the package should be created