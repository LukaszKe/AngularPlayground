export class Alert {
    id: string = "";
    type: string = "success";
    message: string = "";

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}