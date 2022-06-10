import { Test1 } from "./Test1";

export class Test2 extends Test1 {
    private _aa: number;
    private test() {
        let self = this;
        self._aa = 55;
        setTimeout(function () {
            self._aa;
        }, 300)

        setTimeout(() => {
            self._aa;
        }, 300)
    }
}