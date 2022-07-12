import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { TenantToken } from "../Tenant/TenantToken.enum";
import { v4 as uuidv4 } from 'uuid';
import { PackageWebClient } from "./PackageWebClient";
import { CyRequest } from "../../../../src/utils/CyRequest";

const request = new CyRequest();

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
    cy.fixture('SinerlogSafetyTracker/Package/add-package').then(jsonBody => {
        jsonBody.orderNumber = uuidv4()
        request.jsonBody = jsonBody
    })
});


When(/^send a create request$/, () => {
    PackageWebClient.Add(request)
});

Then(/^the package should be created$/, () => {
    expect(request.status).to.be.equals(201)
})