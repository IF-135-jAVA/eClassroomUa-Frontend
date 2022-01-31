export class Topic{
    topicId: number = 0;
    title: string = "";
    text: string = "";
    classroomId: number = 0;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
