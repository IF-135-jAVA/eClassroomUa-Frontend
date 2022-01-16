export class Comments{
    id: number = 0;
    text: string = "";
    date: Date = new Date();
    authorId: number = 0;
    announcementId: number = 0;
    materialId: number = 0;
    userAssignmentId: number = 0;
    enabled: boolean = true;
    
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}