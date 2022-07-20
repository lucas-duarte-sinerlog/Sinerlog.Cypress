import StatusCode from "status-code-enum"
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { HttpAsertion } from "../../assertions/http-assertions"
import { Label } from "../../models/cross-commerce/label-model"
import { ShippingList } from "../../models/cross-commerce/shippingList-model"
import { ShippingSeller } from "../../models/cross-commerce/shippingSeller-model"
import { LabelWebClient } from "../../webclients/cross-commerce/label-webclient"
import { ShippingSellerWebClient } from "../../webclients/cross-commerce/shippingSeller-webclient"

const shippingSeller = new ShippingSeller()
const label = new Label()
const shippingList = new ShippingList()

// Scenario #1


Given(/^i want to suspend a delivery$/, () => {
    return true
})

When(/^the shipping seller with id "([^"]*)" exists$/, (shippingSellerId: number) => {
    shippingSeller.id = shippingSellerId
    ShippingSellerWebClient.Get(shippingSeller).should((response) => {
        expect(response.status).to.be.equals(200)
    })
})

When(/^i set a "([^"]*)" label default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/label/${jsonName}`).then(fixture => {
        label.BuildPayload(fixture)
    })
})

When(/^send a create label request$/, () => {
    LabelWebClient.Add(label)
})

Then(/^the label should be created$/, () => {
    HttpAsertion.CheckStatusCode(label.response, StatusCode.SuccessCreated)
})

When(/^i set a "([^"]*)" shipping list default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/shippingList/${jsonName}`).then(fixture => {
        shippingList.BuildPayload(fixture)
    })
})

When(/^add a newly created label$/, () => {
    shippingList.payload.labelsToInsert.push(label.trackingCode)
})

When(/^send a shipping list create request$/, () => {
    
})

Then(/^the shipping list must be created$/, () => {
    return true
})

When(/^i send a delivery cancel request$/, () => {
    return true
})

Then(/^the delivery must be suspend$/, () => {
    return true
})
