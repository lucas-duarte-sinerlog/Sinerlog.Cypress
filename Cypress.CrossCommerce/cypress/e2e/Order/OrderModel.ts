export class Order {
    id: number

    Build(response: Cypress.Response<any>) {
        this.id = response.body
    }
}