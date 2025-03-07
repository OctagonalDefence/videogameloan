export class User {

    email: string = '';
    name: string = '';
    password: string = '';
    tipus: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
