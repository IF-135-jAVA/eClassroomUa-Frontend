export class Announcement{
    id: number = 0;
    text: string = "";
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}