import { Logger } from "../../../../src/utils/Logger";
import { ApiKey } from "../../enums/onboarding/account/apiKey";
import { Label } from "../../models/cross-commerce/label-model";
import { v4 as uuidv4 } from 'uuid';


export class LabelWebClient {
    static Add(label: Label) {
        label.payload.invoiceKey = uuidv4()
        label.payload.invoiceNumber = uuidv4()
        Logger.LogRequestBody(label.payload)
        return cy.request({
            method: 'POST',
            url: '/Shipping/label',
            headers: { 'ApiKey': ApiKey.Sinerlog, },
            body: label.payload,
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            label.BuildResponse(response)
            label.Build(response)
        });
    }
}
