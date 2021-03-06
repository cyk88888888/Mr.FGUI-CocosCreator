/*
 * @Description: 主入口
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { scaleMode } from './framework/base/ScaleMode';
import { SceneMgr } from './framework/mgr/SceneMgr';
import { SoundMrg } from './framework/mgr/SoundMrg';
import { TickMgr } from './framework/mgr/TickMgr';
import { LoadingScene } from './modules/loading/LoadingScene';
import { Test2 } from './modules/test/Test2';
@ccclass('Main')
export class Main extends Component {
    @property(Node)
    subSoundNode: Node;
    onLoad() {
        fgui.GRoot.create();
        SoundMrg.inst.defaultBgMusic = "sound/bg00";//设置默认背景音乐
        SoundMrg.inst.subSoundNode = this.subSoundNode;//设置场景音效节点
        SceneMgr.inst.mainScene = 'HomeScene';//设置主场景
        fgui.UIConfig.buttonSound = "sound/click";//设置全局按钮点击音效
        TickMgr.inst.mainNode = this;
        
        let test2 = new Test2();
        
        scaleMode.designWidth = 640;
        scaleMode.designHeight = 1280;
        scaleMode.designHeight_min = 1030;
        scaleMode.designHeight_max = 1280;
        SceneMgr.inst.run(LoadingScene, { msg: '我是LaodingScene' });
    }

    update(dt: number){
        TickMgr.inst.onTick(dt);
    }
}

