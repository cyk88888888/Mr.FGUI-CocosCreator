/*
 * @Description: 设置界面
 * @Author: CYK
 * @Date: 2022-05-30 10:53:05
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SoundMrg } from '../../../framework/mgr/SoundMrg';
import { UILayer } from '../../../framework/ui/UILayer';
@ccclass('EquipLayer')
export class EquipLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    constructor(){
        super();
        this.init();
    }
    protected onEnter() {
        let self = this;
        SoundMrg.inst.playBg('sound/bg01');
    }

    private onExit(){
    }

}

