export class Material{
    id: number = 0;
    type: string = "";
    title: string = "";
    text: string = "";
    maxScore: number = 0;
    task: string = "";
    url: string = "";
    startDate: Date = new Date();
    dueDate: Date = new Date();
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}