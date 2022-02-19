export class AnswerFile {
  id: number = 0;
  userAssignmentId: number = 0;
  path: string = "";
  fileName: string = "";

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
