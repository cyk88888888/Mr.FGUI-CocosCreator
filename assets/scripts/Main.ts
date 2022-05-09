import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { GameMgr } from './framework/base/GameMgr';
import { Loading } from './modules/Loading/Loading';
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        fgui.GRoot.create();
        GameMgr.inst.init();//游戏初始化
        Loading.show('UI/Loading');//显示加载登入页面
    }

}

