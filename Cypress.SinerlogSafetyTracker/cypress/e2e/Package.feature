Feature: Package
    Package
    Scenario: Create a default Package
        Given I want to create a package
        And the following tenant exists
        When i set a default request payload
        And send a create request
        Then the package should be created