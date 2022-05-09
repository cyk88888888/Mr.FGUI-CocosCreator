import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { layer } from '../../lib/Init';
import { Home } from '../Home/Home';
@ccclass('Loading')
export class Loading extends Component {
    private _view: fgui.GComponent = null!;
    private _progress: fgui.GProgressBar;
    private _isLoadingHome:boolean;
    onLoad() {
        fgui.UIPackage.loadPackage("UI/Loading", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        let self = this;
        self._view = fgui.UIPackage.createObject("Loading", "Main").asCom;
        layer.addChild(self._view);
        self._progress = self._view.getChild('progress') as fgui.GProgressBar;
    }

    update(deltaTime: number) {
        let self = this;
        if (self._progress) {
            self._progress.value += 0.5;
            if (!self._isLoadingHome && self._progress.value >= 100) {
                self._isLoadingHome = true;
                fgui.UIPackage.loadPackage("UI/Home", () => {
                    self.destroy();
                    layer.node.addComponent(Home);
                });
            }
        }
    }

    onDestroy() {
        this._view.dispose();
    }
}

