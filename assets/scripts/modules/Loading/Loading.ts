import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { Layer } from '../../framework/Layer';
import { Home } from '../Home/Home';
@ccclass('Loading')
export class Loading extends Layer {
    private _progress: fgui.GProgressBar;
    private _isLoadingHome: boolean;
    protected onEnter() {
        let self = this;
        self._progress = self.view.getChild('progress') as fgui.GProgressBar;
    }

    update(deltaTime: number) {
        let self = this;
        if (self._progress) {
            self._progress.value += 0.5;
            if (!self._isLoadingHome && self._progress.value >= 100) {
                self._isLoadingHome = true;
                Home.show("Home", () => {
                    self.close();
                });
            }
        }
    }
}

