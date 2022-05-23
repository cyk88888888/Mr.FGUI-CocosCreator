/*
 * @Description: 主入口
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { _decorator, Component} from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { scaleMode } from './framework/base/ScaleMode';
import { SceneMgr } from './framework/mgr/SceneMgr';
import { LoadingScene } from './modules/loading/LoadingScene';
@ccclass('Main')
export class Main extends Component {
    onLoad() {
        SceneMgr.inst.mainScene = 'HomeScene';
        fgui.GRoot.create();
        scaleMode.designWidth = 640;
        scaleMode.designHeight = 1280;
        scaleMode.designHeight_min = 1030;
        scaleMode.designHeight_max = 1280;
        SceneMgr.inst.push(LoadingScene, { msg: '我是LaodingScene' });
    }
}

