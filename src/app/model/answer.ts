export class Answer {
  id: number = 0;
  userAssignmentId: number = 0;
  text: string = "";
  enabled: boolean = true;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
