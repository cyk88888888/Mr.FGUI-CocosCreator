/*
 * @Description: 资源管理器
 * @Author: CYK
 * @Date: 2022-05-17 17:14:26
 */
import { Asset, resources } from "cc";
import * as fgui from "fairygui-cc";
import { JuHuaDlg } from "../../modules/common/JuHuaDlg";
export class ResMgr {
    private static _inst: ResMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ResMgr();
        }
        return this._inst;
    }

    private _juHuaDlg: JuHuaDlg;
    private closeJuHuaDlg() {
        if (this._juHuaDlg) {
            this._juHuaDlg.close();
            this._juHuaDlg = null;
        }
    }
    /**
     * 加载资源
     * @param res 资源列表
     * @param itorCb 单个资源加载完毕回调
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public loadWithItor(res: string[] | string, itorCb?: Function, cb?: Function, ctx?: any) {
        let resList = typeof res === 'string' ? [res] : res;
        let totLen = resList.length;//待下载总个数
        let hasLoadResCount: number = 0;//已下载个数
        let isAllLoaded = true;
        for (let i = 0; i < totLen; i++) {
            let resName = resList[i];
            if (!this.get(resName)) {
                isAllLoaded = false;
                break;
            }
        }
        if (!isAllLoaded && !this._juHuaDlg && this.get('ui/common')) {
            this._juHuaDlg = JuHuaDlg.show() as JuHuaDlg;
        }

        let loadSucc = (resName: string, isFromCache?: boolean) => {
            hasLoadResCount++;
            console.log('resName: ' + resName + '加载完毕' + (isFromCache ? '(缓存已有)' : ''));
            if (itorCb) itorCb.call(ctx, resName, hasLoadResCount);
            if (hasLoadResCount == totLen) {
                this.closeJuHuaDlg();
                if (cb) cb.call(ctx);
            }
        }

        for (let i = 0; i < totLen; i++) {
            let resName = resList[i];
            if (this.get(resName)) {//缓存已有
                loadSucc(resName, true);
            } else {
                if (resName.startsWith('ui/')) {//fgui包资源
                    fgui.UIPackage.loadPackage(resName, (err, pkg) => {//加载资源包
                        if (!err) {
                            loadSucc(resName);
                        } else {
                            console.error('resName: ' + resName + '加载失败');
                        }
                    });
                } else {
                    resources.load(resName, Asset, (err: Error | null, asset: Asset) => {
                        if (!err) {
                            loadSucc(resName);
                        } else {
                            console.error('resName: ' + resName + '加载失败');
                        }
                    })
                }
            }
        }
    }

    /**
     * 下载资源
     * @param resList 资源列表
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public load(res: string[] | string, cb?: Function, ctx?: any) {
        let resList = typeof res === 'string' ? [res] : res;
        this.loadWithItor(resList, null, cb, ctx);
    }

    /**获取已加载缓存的资源 */
    public get(resName: string) {
        if (resName.startsWith('ui/')) {//fgui包资源
            let pkgName = resName.split('/')[1].toLowerCase();
            return fgui.UIPackage.getByName(pkgName);
        } else {
            return resources.get(resName);
        }
    }
    /**
     * 释放资源
     * @param res 
     */
    public releaseRes(res: string | string[]) {
        let resList = typeof res === 'string' ? [res] : res;
        for (let i = 0; i < resList.length; i++) {
            let resName = resList[i];
            if (resName.startsWith('ui/')) {//fgui包资源
                let pkgName = resName.split('/')[1].toLowerCase();
                fgui.UIPackage.removePackage(pkgName);
            } else {
                resources.release(resName);
            }

        }
    }
}
