export class Criterion{
    id: number = 0;
    title: string = "";
    description: string = "";
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}