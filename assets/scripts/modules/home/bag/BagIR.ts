/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-06-06 17:49:35
 */
import { _decorator } from 'cc';
import * as fgui from "fairygui-cc";
const { ccclass, property } = _decorator;
@ccclass('BagIR')
export class BagIR extends fgui.GButton {
    public constructor() {
        super();
    }

    protected onConstruct(): void {
        let selectBg = this.getChild("selectBg", fgui.GTextField);
        selectBg;
    }
}