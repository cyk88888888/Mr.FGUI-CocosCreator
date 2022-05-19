import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('Loading')
export class Loading extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'loading';
    private _progress: fgui.GProgressBar;
    private _isLoadingHome: boolean;

    protected onEnter() {
        let self = this;
        self._progress = self.view.getChild('progress') as fgui.GProgressBar;
    }

    update(dt: number) {
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

