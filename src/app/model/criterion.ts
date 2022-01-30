export class Criterion{
    criterionId: number = 0;
    title: string = "";
    description: string = "";

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
