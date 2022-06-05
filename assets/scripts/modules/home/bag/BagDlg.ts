/*
 * @Description: 背包弹窗
 * @Author: CYK
 * @Date: 2022-06-02 17:20:24
 */
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIDlg } from '../../../framework/ui/UIDlg';

@ccclass('BagDlg')
export class BagDlg extends UIDlg {
    /** 包名称 */
    public static pkgName: string = 'home';

    private frame: any;
    private onEnter() {
        let self = this;
        self.frame;
        
    }
}