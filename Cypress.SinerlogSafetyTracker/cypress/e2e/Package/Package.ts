import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";
import { v4 as uuidv4 } from 'uuid';
let requestStatus;
let jsonBody;

Given(/^I want to create a order$/, () => {
    return true;
});

When(/^the following account exists$/, () => {
    cy.request({
        method: 'GET',
        url: 'http://dev.doc.sinerlog.log.br/onboarding/api/Account/1',
    }).then(response => {
        expect(response.status).to.be.equals(200)
    });
});

When(/^i set a default request payload$/, () => {
    cy.fixture('Sinerlog/CrossCommerce/Order/add-crosscommerce-order').then(json => {
        json.code = uuidv4()
        jsonBody = json
    })
});

When(/^send a create request$/, () => {
    cy.request({
        method: 'POST',
        url: '/Orders',
        headers: { 'ApiKey': AccountApiKey.Sinerlog, },
        body: jsonBody
    }).then(response => {
      requestStatus = response.status
    });
});

Then(/^the order should be created$/, () => {
    expect(requestStatus).to.be.equals(201)
});
