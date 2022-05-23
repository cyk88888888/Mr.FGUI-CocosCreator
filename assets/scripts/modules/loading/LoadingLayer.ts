/*
 * @Description: loading登入页
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { ResMgr } from '../../framework/mgr/ResMgr';
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('LoadingLayer')
export class LoadingLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'loading';
    private progress: fgui.GProgressBar;
    private _isLoadingHome: boolean;

    private _preResList: string[];
    private _toPercent: number = 0;
    protected onEnter() {
        this._preResList = ['ui/common'];
        let curDownLoadNum: number = 0;//当前已下载个数
        ResMgr.inst.loadWithItor(this._preResList, () => {
            curDownLoadNum++;
            this._toPercent = (curDownLoadNum / this._preResList.length) * 100;
        });
    }

    update(dt: number) {
        let self = this;
        if (self.progress && self.progress.value < self._toPercent) {
            self.progress.value += 0.5;
            if (!self._isLoadingHome && self.progress.value >= 100) {
                self._isLoadingHome = true;
                SceneMgr.inst.push('HomeScene');
            }
        }
    }
}

