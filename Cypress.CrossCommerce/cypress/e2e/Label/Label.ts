import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { v4 as uuidv4 } from 'uuid';
import { Logger } from "../../utils/Logger";
let requestStatus;
let jsonBody;

Given(/^I want to create a label$/, () => {
	cy.fixture('Sinerlog/CrossCommerce/Shipping/Label/add-crosscomerce-label').then(fixture => {
		fixture.invoiceNumber = uuidv4()
		fixture.invoiceKey = uuidv4()
		jsonBody = fixture
	})
});

When(/^i set "([^"]*)" delivery type$/, (deliveryType) => {
	jsonBody.deliveryType = deliveryType
});

When(/^a "([^"]*)" zip code "([^"]*)"$/, (city, zipCode) => {
	jsonBody.recipient.city = city
	jsonBody.recipient.zipCode = zipCode
});

When(/^send a create request$/, () => {
	cy.request({
		method: 'POST',
		url: '/Shipping/label',
		headers: { 'ApiKey': '3F1B0C68-4CE2-4CB7-A2D9-95BA3B556E4C', },
		body: jsonBody,
		failOnStatusCode: false
	}).then(response => {
		requestStatus = response.status
	});
});

Then(/^the label should be created$/, () => {
	expect(requestStatus).to.be.equal(201)
});


When(/^the following Shipping Company exists$/, () => {
	cy.request({
		method: 'GET',
		url: 'http://dev.doc.sinerlog.log.br/onboarding/api/ShippingCompany/3		',
	}).should(response => {
		expect(response.status).to.be.equals(200)
	});
});

When(/^the following service exists in Shipping Company above$/, () => {
	cy.request({
		method: 'GET',
		url: 'http://dev.doc.sinerlog.log.br/onboarding/api/ShippingCompany/3',
	}).then(response => {
		Logger.LogResponseBody(response)
	}).then(response => {
		try {
			expect(response.status).to.be.equals(200)
			expect(response.body.services[1].name).to.be.equals('Sedex 10')
			expect(response.body.services[1].sinerlogServiceType).to.be.equals('Priority')
			expect(response.body.services[1].serviceExternalCode.id).to.be.equals("124877")
			expect(response.body.services[1].serviceExternalCode.code).to.be.equals('04014')
		} catch (error) {
			throw new Error("**Shipping company service not exists for test**");

		}
	});
});
