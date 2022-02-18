export class Level{
    id: number = 0;
    title: string = "";
    description: string = "";
    mark: number = 0;
    criterionId: number = 0;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
