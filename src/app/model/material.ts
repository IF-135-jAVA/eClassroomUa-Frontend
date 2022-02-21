export class Material{
    id: number = 0;
    materialType: string = "";
    title: string = "";
    text: string = "";
    maxScore: number = 0;
    task: string = "";
    url: string = "";
    startDate: Date = new Date();
    dueDate: Date = new Date();
    urls: string[] = [];
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}