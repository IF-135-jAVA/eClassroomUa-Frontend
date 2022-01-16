export class UserAssignment{
    id: number = 0;
    materialId: number = 0;
    userId: number = 0;
    assignmentStatusId: number = 0;
    grade: number = 0;
    feedback: string = "";
    submissionDate: Date = new Date();
    enabled: boolean = true;
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}