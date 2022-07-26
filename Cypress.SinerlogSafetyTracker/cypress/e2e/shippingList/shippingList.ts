import StatusCode from "status-code-enum"
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { HttpAssertion } from "../../assertions/http-assertions"
import { Label } from "../../models/cross-commerce/label-model"
import { ShippingList } from "../../models/cross-commerce/shippingList-model"
import { ShippingSeller } from "../../models/cross-commerce/shippingSeller-model"
import { LabelWebClient } from "../../webclients/cross-commerce/label-webclient"
import { ShippingSellerWebClient } from "../../webclients/cross-commerce/shippingSeller-webclient"
import { ShippingListWebClient } from "../../webclients/cross-commerce/shippingList-webclient"

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
        label.BuildRequestPayload(fixture)
    })
})

When(/^send a create label request$/, () => {
    LabelWebClient.Add(label)
})

Then(/^the label should be created$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessCreated)
})

When(/^i set a "([^"]*)" shipping list default payload$/, (jsonName) => {
    cy.fixture(`cross-commerce/shippingList/${jsonName}`).then(fixture => {
        shippingList.BuildRequestPayload(fixture)
    })
})

When(/^include a newly created label$/, () => {
    shippingList.payload.labelsToInsert.push(label.trackingCode)
})

When(/^send a shipping list create request$/, () => {
    ShippingListWebClient.Add(shippingList)
})

Then(/^the shipping list must be created$/, () => {
    HttpAssertion.CheckStatusCode(shippingList.response, StatusCode.SuccessCreated)
})

When(/^i send a delivery cancel request with a newly included label$/, () => {
    label.payload = null
    LabelWebClient.DeliveryCancel(label)
})

Then(/^the delivery must be suspend$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessOK)
})


When(/^i get the shipping list$/, () => {
	return true;
});

Then(/^the status must be "([^"]*)"$/, (suspendedStatus) => {
	console.log(suspendedStatus);
	return true;
});


// Senario #2


When(/^i send a shipping list close request$/, () => {
	ShippingListWebClient.Close(shippingList)
});

Then(/^the shipping list must be closed$/, () => {
    HttpAssertion.CheckStatusCode(shippingList.response, StatusCode.SuccessOK)
});


Then(/^the delivery must not be suspend$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.ClientErrorBadRequest)
});


Then(/^the delivery must be suspended$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessOK)

});



// Scenario #3

When(/^send a label express create request$/, () => {
	LabelWebClient.Express(label)
});


Then(/^the label express should be created$/, () => {
    HttpAssertion.CheckStatusCode(label.response, StatusCode.SuccessCreated)
});


When(/^i send a delivery cancel request with a newly included label manually$/, () => {
	cy.log(`Label tracking code: ${label.response.headers.TrackingCode}`)
});



