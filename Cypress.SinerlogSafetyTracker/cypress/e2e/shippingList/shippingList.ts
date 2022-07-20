import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ShippingSeller } from "../../models/cross-commerce/shippingSeller-model";
import { ShippingSellerWebClient } from "../../webclients/cross-commerce/shippingSeller-webclient";

const shippingSeller = new ShippingSeller()

// Scenario #1

Given(/^i want to suspend a delivery$/, () => { });


When(/^the shipping seller with id "([^"]*)" exists$/, (shippingSellerId: number) => {
    shippingSeller.id = shippingSellerId
    ShippingSellerWebClient.Get(shippingSeller).should((response) => {
        expect(response.status).to.be.equals(200)
    })
});


When(/^i set a "([^"]*)" label default payload$/, (jsonName) => {
    cy.fixture("cross-commerce/")
});

When(/^send a create label request$/, () => {
    return true;
});

Then(/^the label should be created$/, () => {
    return true;
});

When(/^i set a "([^"]*)" shipping list default payload$/, (args1) => {
    console.log(args1);
    return true;
});

When(/^add a newly created label$/, () => {
    return true;
});

When(/^send a shipping list create request$/, () => {
    return true;
});

Then(/^the shipping list must be created$/, () => {
    return true;
});

When(/^i send a delivery cancel request$/, () => {
    return true;
});

Then(/^the delivery must be suspend$/, () => {
    return true;
});
