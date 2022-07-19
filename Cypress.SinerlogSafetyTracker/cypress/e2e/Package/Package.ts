import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { TenantToken } from "../tenant/TenantToken.enum";
import { PackageWebClient } from "../../webclients/sinerlog-safety-tracker/package-webclient";
import { Package } from "../../models/sinerlog-safety-tracker/package-model";
import { WebClientModelBase } from "../../models/web-client-model-base";
import { Logger } from "../../utils/Logger";

const sstPackage = new Package()
const genericRequest = new WebClientModelBase()

Given(/^I want to create a package$/, () => { });

When(/^a tenant "([^"]*)" with code "([^"]*)" exists$/, (tenant, tenantCode) => {
    cy.request({
        method: 'GET',
        url: `https://dev.easymundi.com/api/tenant/${tenantCode}`,
        auth: {
            bearer: TenantToken.TesteHub
        },
        failOnStatusCode: false
    }).then((response) => {
        genericRequest.status = response.status
        Logger.LogResponseBody(response)
        expect(response.status).to.be.equals(200)
        expect(response.body.data.name, '**Tenant name**').to.be.equals('Teste HUB')
    });
});


When(/^i set a delivery tax "([^"]*)" "([^"]*)"$/, (deliveryTax) => {
	cy.fixture('SinerlogSafetyTracker/Package/add-package').then(fixture => {
        fixture.deliveryTax = deliveryTax
        sstPackage.BuildRequest(fixture)
    })
});

When(/^send a package create request$/, () => {
    PackageWebClient.Add(sstPackage)
});

Then(/^the package should be created$/, () => {
    expect(sstPackage.status).to.be.equals(201)
});