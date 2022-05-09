import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { layer } from '../../lib/Init';
@ccclass('Home')
export class Home extends Component {
    private _view: fgui.GComponent = null!;
    onLoad() {
        let self = this;
        self._view = fgui.UIPackage.createObject("Home", "Home").asCom;
        layer.addChild(self._view);
    }

}

