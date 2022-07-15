import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Order } from "../../models/cross-commerce/order-model";
import { OrderWebClient } from "../../webclients/cross-commerce/order-webclient";
import { AccountWebClient } from "../../webclients/onboarding/account-webclient";

const order = new Order()

Given(/^I want to create a order$/, () => { });

When(/^send a create request$/, () => {
    OrderWebClient.Add(order)
});

Then(/^the order should be created$/, () => {
    expect(order.status).to.be.equals(201)
});

Given(/^I want to cancel an order$/, () => { });

Then(/^the account "([^"]*)" with id "([^"]*)" and exists$/, (name, id: number) => {
    AccountWebClient.Get(id).should((response) => {
      expect(response.status).to.be.eq(200)
      expect(response.body.name).to.be.eq(name)
    })
});

When(/^i set a "([^"]*)" default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/order/${jsonName}`).then(fixture => {
      order.BuildPayload(fixture)
    })
});

When(/^send a cancel request$/, () => {

});

Then(/^the order must be canceled$/, () => {
    return true;
});
