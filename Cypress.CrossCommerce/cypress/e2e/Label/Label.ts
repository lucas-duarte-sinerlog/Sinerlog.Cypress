import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Logger } from "../../../../src/utils/Logger";
import { CyRequest } from "../../../../src/utils/CyRequest";
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";
import { LabelWebClient } from './LabelWebClient';
const request = new CyRequest()

Given(/^I want to create a label$/, () => {
	cy.fixture('Sinerlog/CrossCommerce/Shipping/Label/add-crosscomerce-label').then(fixture => {
		fixture.invoiceNumber = uuidv4()
		fixture.invoiceKey = uuidv4()
		request.jsonBody = fixture
	})
});

When(/^i set "([^"]*)" delivery type$/, (deliveryType) => {
	request.jsonBody.deliveryType = deliveryType
});

When(/^a "([^"]*)" zip code "([^"]*)"$/, (city, zipCode) => {
	request.jsonBody.recipient.city = city
	request.jsonBody.recipient.zipCode = zipCode
});

When(/^send a create request$/, () => {
	LabelWebClient.Add(request)
});

Then(/^the label should be created$/, () => {
	expect(request.status).to.be.equal(201)
});


When(/^the following Shipping Company exists$/, () => {
	cy.request({
		method: 'GET',
		url: 'http://dev.doc.sinerlog.log.br/onboarding/api/ShippingCompany/3',
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

		expect(response.status).to.be.equals(200)
		expect(response.body.services[0].name).to.be.equals('Sedex10')
		expect(response.body.services[0].sinerlogServiceType).to.be.equals('Priority')
		expect(response.body.services[0].externalCode).to.be.equals('{\"Id\":\"162016\",\"Code\":\"03158\"}')

	});
});
