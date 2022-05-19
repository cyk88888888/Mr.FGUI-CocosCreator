import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIDlg } from "../../framework/ui/UIDlg";

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UIDlg {
     /** 包名称 */
    public static pkgName: string = 'common';
}