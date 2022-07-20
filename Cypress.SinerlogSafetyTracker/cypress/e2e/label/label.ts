import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Logger } from "../../../../src/utils/Logger";
import { Label } from '../../models/cross-commerce/label-model';
import { LabelWebClient } from '../../webclients/cross-commerce/label-webclient';

const label = new Label()

Given(/^I want to create a label$/, () => { });

When(/^i set a "([^"]*)" label default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/label/${jsonName}`).then(fixture => {
        label.BuildPayload(fixture)
    })
})

When(/^i set "([^"]*)" delivery type$/, (deliveryType) => {
    label.payload.deliveryType = deliveryType
});

When(/^a "([^"]*)" zip code "([^"]*)"$/, (city, zipCode) => {
    label.payload.recipient.city = city
    label.payload.recipient.zipCode = zipCode
});

When(/^send a create request$/, () => {
    LabelWebClient.Add(label)
});

Then(/^the label should be created$/, () => {
    expect(label.status).to.be.equal(201)
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
