import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";
import { v4 as uuidv4 } from 'uuid';
import { OrderWebClient } from "./OrderWebClient";
import { CyRequest } from "../../../../src/utils/CyRequest";
import { Order } from "./OrderModel";

const request = new CyRequest()
const order = new Order()

Given(/^the following account exists$/, () => {
    cy.request({
        method: 'GET',
        url: 'http://dev.doc.sinerlog.log.br/onboarding/api/Account/1',
    }).then(response => {
        expect(response.status).to.be.equals(200)
    });
});

When(/^I want to create a order$/, () => {});

When(/^i set a default request payload$/, () => {
    cy.fixture('Sinerlog/CrossCommerce/Order/add-crosscommerce-order').then(fixture => {
        fixture.code = uuidv4()
        request.BuildFixture(fixture)
    })
});

When(/^send a create request$/, () => {
    OrderWebClient.Add(request, order)
});

Then(/^the order should be created$/, () => {
    expect(request.status).to.be.equals(201)
});


Then(/^the order is created$/, () => {
	return true;
});

Then(/^i sent a cancel request$/, () => {
	OrderWebClient.Cancel(request, order)
});

Then(/^the order must be canceled$/, () => {
	return true;
});


When(/^i wait for a Logistc Order$/, () => {
	cy.wait(100000)
});


