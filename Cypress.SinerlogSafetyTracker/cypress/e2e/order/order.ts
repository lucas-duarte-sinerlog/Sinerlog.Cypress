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

Then(/^the account "([^"]*)" with id "([^"]*)" exists$/, (name, id: number) => {
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


// Order Export

Given(/^i want to export an order to SST from CrossCommerce$/, () => {
    return true;
});

When(/^set a field "([^"]*)"$/, (args1) => {
    console.log(args1);
    return true;
});

When(/^i wait for an order export time$/, () => {
    return true;
});

When(/^consult an order at SST$/, () => {
    return true;
});

Then(/^the order must have been exported$/, () => {
    return true;
});

// Split


Given(/^I want to split an order by item and value$/, () => {
    return true;
});


When(/^i set a totalItems field "([^"]*)", currency "([^"]*)", totalAmount "([^"]*)", totalTax "([^"]*)", totalShipping "([^"]*)"$/, (totalItems, currency, totalAmount, totalTax, totalShipping) => {
    console.log(totalItems, currency, totalAmount, totalTax, totalShipping);
    order.payload.totalItems = totalItems
    order.payload.currency = currency
    order.payload.totalAmount = totalAmount
    order.payload.totalTax = totalTax
    order.payload.totalShipping = totalShipping
});

When(/^i set a first product code "([^"]*)" with quantity "([^"]*)", unit price "([^"]*)", shippingInsurance field "([^"]*)"$/, (productCode,quantity,unitPrice,shippingInsurance: boolean) => {
	console.log(productCode,quantity,unitPrice,shippingInsurance);
    order.payload.items[0].code = productCode
	order.payload.items[0].quantity = quantity
	order.payload.items[0].unitPrice = unitPrice
	order.payload.items[0].shippingInsurance = Boolean(shippingInsurance)
	return true;
});


When(/^i set a second product code "([^"]*)" with quantity "([^"]*)", unit price "([^"]*)", shippingInsurance field "([^"]*)"$/, (productCode,quantity,unitPrice,shippingInsurance: boolean) => {
	console.log(productCode,quantity,unitPrice,shippingInsurance);
    order.payload.items[1].code = productCode
	order.payload.items[1].quantity = quantity
	order.payload.items[1].unitPrice = unitPrice
	order.payload.items[1].shippingInsurance = Boolean(shippingInsurance)
	return true;
});



