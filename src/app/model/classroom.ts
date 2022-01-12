export class Classroom{
    classroomId: number = 0;
    title: string = "";
    session: string = "";
    description: string = "";
    code: string = "";
    user_id: number = 0;
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}