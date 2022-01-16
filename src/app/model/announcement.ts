import { Comments } from "./comment";

export class Announcement{
    id: number = 0;
    text: string = "";
    courseId: number = 0;    
    comments: Comments[] = [];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}