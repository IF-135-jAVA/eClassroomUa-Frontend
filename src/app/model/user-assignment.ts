export class UserAssignment{
    id: number = 0;
    materialId: number = 0;
    materialTitle: string = "";
    dueDate: Date = new Date();
    maxScore: number = 0;
    userId: number = 0;
    userFirstName: string = "";
    userLastName: string = "";
    assignmentStatusId: number = 0;
    assignmentStatusTitle: string = "";
    submissionDate: Date = new Date();
    grade: number = 0;
    feedback: string = "";
    enabled: boolean = true;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
