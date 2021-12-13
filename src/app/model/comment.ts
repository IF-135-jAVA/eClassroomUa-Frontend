import { User } from "./user";

export class Comment{
    id: number = 0;
    text: string = "";
    date: Date = new Date();
    author: User = new User();
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}