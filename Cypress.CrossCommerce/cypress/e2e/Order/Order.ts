import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { v4 as uuidv4 } from 'uuid';
import { OrderWebClient } from "./OrderWebClient";
import { CyRequest } from "../../../../src/utils/CyRequest";
import { Order } from "./OrderModel";

const request = new CyRequest()
const order = new Order()

// Scenario #1

Given(/^the following account exists$/, () => {
    cy.request({
        method: 'GET',
        url: 'http://dev.doc.sinerlog.log.br/onboarding/api/Account/1',
    }).then(response => {
        request.BuildResponse(response)
        expect(response.status).to.be.equals(200)
    });
});

When(/^I want to create a order$/, () => {});

When(/^i set a default request payload$/, () => {
    cy.fixture('Sinerlog/CrossCommerce/Order/add-crosscommerce-order').then(fixture => {
        request.BuildRequest(fixture)
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

When(/^i wait for a Logistc Order$/, () => {
	cy.wait(100000)
});

// Scenario #2

Given(/^I want to cancel an order$/, () => {
	return true;
});

When(/^the following webhook config also exists$/, () => {
	expect(request.responseBody.listNotificationUrls[0].url).to.be.equals('https://webhook.site/1bd9166d-092b-4712-be82-2433a10db418')
});

When(/^i create an order$/, () => {
    cy.fixture('Sinerlog/CrossCommerce/Order/add-crosscommerce-order').then(fixture => {
      request.BuildRequest(fixture)
      OrderWebClient.Add(request, order)
    })
});

When(/^cancel this order$/, () => {
	OrderWebClient.Cancel(request, order)
});

Then(/^the order must be canceled$/, () => {

	expect(request.status).to.be.equals(200)
    OrderWebClient.Get(order).should(response => {
      expect(response.body.status, "**Status**").to.be.equals('canceled')
    })
});

Then(/^the system must send a webhook$/, () => {
	cy.log("Check in \"https://search-dev-sinerlog-shm-opensearch-7bm6ka7rivbvhshmqpiwps4zui.us-east-1.es.amazonaws.com\"")
});