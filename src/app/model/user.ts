export class User{
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    enabled: boolean = true;
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}