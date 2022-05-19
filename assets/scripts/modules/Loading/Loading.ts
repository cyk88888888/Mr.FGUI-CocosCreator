import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('Loading')
export class Loading extends UILayer {
    private _progress: fgui.GProgressBar;
    private _isLoadingHome: boolean;
    private ctor(){
        this.pkgName = 'loading';
    }
    
    protected onEnter() {
        let self = this;
        self._progress = self.view.getChild('progress') as fgui.GProgressBar;
        self.setInterval(self.onInterval, 10);
    }

    private onInterval() {
        let self = this;
        if (self._progress) {
            self._progress.value += 0.5;
            if (!self._isLoadingHome && self._progress.value >= 100) {
                self._isLoadingHome = true;
                SceneMgr.inst.push('HomeScene');
            }
        }
    }
}

