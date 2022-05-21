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
     * @param resList 资源列表
     * @param itorCb 单个资源加载完毕回调
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public loadWithItor(resList: string[], itorCb?: Function, cb?: Function, ctx?: any) {
        let totLen = resList.length;//待下载总个数
        let hasLoadResCount: number = 0;//已下载个数
        if (!this._juHuaDlg && fgui.UIPackage.getByName('common')) {
            this._juHuaDlg = JuHuaDlg.show() as JuHuaDlg;
        }
        
        let loadSucc = (resName: string) => {
            hasLoadResCount++;
            console.log('resName: ' + resName + '加载完毕');
            if (itorCb) itorCb.call(ctx, resName, hasLoadResCount);
            if (hasLoadResCount == totLen) {
                this.closeJuHuaDlg();
                if (cb) cb.call(ctx);
            }
        }

        for (let i = 0; i < totLen; i++) {
            let resName = resList[i];
            let pkgName = resName.split('/')[1].toLowerCase();
            if (fgui.UIPackage.getByName(pkgName)) {//缓存已有
                loadSucc(resName);
            } else {
                fgui.UIPackage.loadPackage(resName, (err, pkg) => {//加载资源包
                    if (!err) {
                        loadSucc(resName);
                    } else {
                        console.error('resName: ' + resName + '加载失败');
                    }
                });
            }
        }
    }

    /**
     * 下载资源
     * @param resList 资源列表
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public load(resList: string[], cb?: Function, ctx?: any) {
        this.loadWithItor(resList, null, cb, ctx);
    }
}
