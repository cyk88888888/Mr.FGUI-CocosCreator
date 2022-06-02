/*
 * @Description: 技能界面
 * @Author: CYK
 * @Date: 2022-05-30 10:53:05
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UILayer } from '../../../framework/ui/UILayer';
@ccclass('SkillLayer')
export class SkillLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    protected onEnter() {
        let self = this;
        console.log('进入SkillLayer');
    }


    private onExit(){
        console.log('退出SkillLayer');
    }

}

