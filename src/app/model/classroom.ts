export class Classroom{
    id: number = 0;
    title: string = "";
    session: string = "";
    description: string = "";
    code: string = "";
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}