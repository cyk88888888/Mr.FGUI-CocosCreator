export class Test1 {
    constructor() {
        if (this['ctor']) this['ctor']();
        if (this['ctor_a']) this['ctor_a']();
    }
}
