import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { LayerMgr } from './framework/base/LayerMgr';
import { Loading } from './modules/Loading/Loading';
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        fgui.GRoot.create();
        LayerMgr.inst.init();//游戏初始化
        Loading.show('Loading');//显示加载登入页面
    }

}

