export class ChangePassword{
    password: string = "";
    token: string = ""; 

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}