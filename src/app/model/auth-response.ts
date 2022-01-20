export class AuthResponse{
    token: string = "";
    tokenType: string = ""; 

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}