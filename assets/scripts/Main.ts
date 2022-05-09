import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { init, layer } from './lib/Init';
import { UT } from './modules/Base/Util';
import { Loading } from './modules/Loading/Loading';
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        fgui.GRoot.create();
        init();
        this.showLoadingLayer();
    }

    /**
     * 显示加载登入页面
     */
    private showLoadingLayer(){
        layer.node.addComponent(Loading);
    }

}

