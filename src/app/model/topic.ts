export class Topic{
    id: number = 0;
    title: string = "";
   // text: string = "";
    classroomId: number = 0;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
