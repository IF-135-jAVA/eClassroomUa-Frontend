export class Topic{
    id: number = 0;
    title: string = "";
   // text: string = "";
    classroomId: string = '';

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
