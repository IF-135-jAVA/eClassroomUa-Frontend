import { Comments } from "./comment";

export class Announcement{
    id: number = 0;
    text: string = "";
    courseId: string = "";
    comments: Comments[] = [];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
