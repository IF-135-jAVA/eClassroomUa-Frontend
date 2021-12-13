export class Topic{
    id: number = 0;
    title: string = "";
    text: string = "";
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}