import { WebClientModelBase } from "../web-client-model-base";

export class Label extends WebClientModelBase {
    trackingCode: string | string[]

    Build(response) {
        this.trackingCode = response.body.trackingCode
    }
}