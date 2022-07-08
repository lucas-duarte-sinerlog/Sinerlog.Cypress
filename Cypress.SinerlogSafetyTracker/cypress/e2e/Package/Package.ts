import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Request } from "../Request";
import { TenantToken } from "../Tenant/TenantToken.enum";

const request = new Request();

Given(/^I want to create a package$/, () => { });

Then(/^the following tenant exists$/, () => {
    cy.request({
        method: 'GET',
        url: `https://dev.easymundi.com/api/tenant/teste-hub`,
        auth: {
            bearer: TenantToken.TesteHub
        },
        failOnStatusCode: false
    }).then((response) => {
        request.status = response.status
    });
});


When(/^i set a default payload$/, () => {
	return true;
});


When(/^send a create request$/, () => {
    return true;
});

Then(/^the package should be created$/, () => {
    return true;
});