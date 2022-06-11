import { Test1 } from "./Test1";
export class Test2 extends Test1 {
    public aa: number;
    private ctor() {
        let self = this;
        self.aa = 55;
        setTimeout(function () {
            console.log('self.aa: ' + self.aa); 
        }, 300)
    }

    private ctor_a(){
        let self = this;
        self.aa;
    }
}