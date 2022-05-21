import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIMenuLayer } from '../../framework/ui/UIMenuLayer';

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UIMenuLayer {
     /** 包名称 */
    public static pkgName: string = 'common';
}