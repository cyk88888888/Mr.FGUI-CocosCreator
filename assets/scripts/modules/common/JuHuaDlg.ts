import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UITopLayer } from '../../framework/ui/UITopLayer';

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UITopLayer {
     /** 包名称 */
    public static pkgName: string = 'common';
}