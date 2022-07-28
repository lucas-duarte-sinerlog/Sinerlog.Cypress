import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Logger } from "../../../../src/utils/Logger";
import { Label } from '../../models/cross-commerce/label-model';
import { LabelWebClient } from '../../webclients/cross-commerce/label-webclient';
import { HttpAssertion } from '../../assertions/http-assertions';
import StatusCode from 'status-code-enum';

const label = new Label()

Given(/^I want to create a label$/, () => { });

When(/^i set a "([^"]*)" label default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/label/${jsonName}`).then(fixture => {
        label.BuildRequestPayload(fixture)
    })
})

When(/^i set "([^"]*)" delivery type$/, (deliveryType) => {
    label.payload.deliveryType = deliveryType
});

When(/^a "([^"]*)" zip code "([^"]*)"$/, (city, zipCode) => {
    label.payload.recipient.city = city
    label.payload.recipient.zipCode = zipCode
});

When(/^send a label create request$/, () => {
    LabelWebClient.Add(label)
});

Then(/^the label should be created$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessCreated)
});

When(/^the following Shipping Company exists$/, () => { });

When(/^the Shipping Company with id "([^"]*)" and name "([^"]*)" exists$/, (id, name) => {
    cy.request({
        method: 'GET',
        url: `http://dev.doc.sinerlog.log.br/onboarding/api/ShippingCompany/${id}`,
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

// Label Express

When(/^send a label express create request$/, () => {
	LabelWebClient.Express(label)
});

// Get Label


Given(/^I want to get a label$/, () => {
	return true;
});

When(/^this label was exported for Amazon S3$/, () => {
	return true;
});

When(/^i send a get request with a label code "([^"]*)"$/, (trackingCode: string) => {
	label.trackingCode = trackingCode
    LabelWebClient.Get(label)
});

Then(/^the label should be got$/, () => {
	HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessOK)
});


When(/^this label was not exported for Amazon S3$/, () => {
	return true;
});
