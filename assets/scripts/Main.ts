import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SceneMgr } from './framework/mgr/SceneMgr';
import { Loading } from './modules/Loading/Loading';
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        fgui.GRoot.create();
        SceneMgr.inst.push('LoadingScene');
        // SceneMgr.inst.initLayer();//游戏初始化
        // Loading.show('Loading');//显示加载登入页面
    }
    

}

