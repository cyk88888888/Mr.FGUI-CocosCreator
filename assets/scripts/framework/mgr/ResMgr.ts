import * as fgui from "fairygui-cc";

export class ResMgr {
    private static _inst: ResMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ResMgr();
        }
        return this._inst;
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
        for (let i = 0; i < totLen; i++) {
            let resName = resList[i];
            fgui.UIPackage.loadPackage(resName, function () {//加载资源包
                hasLoadResCount++;
                if (itorCb) itorCb.call(ctx, resName, hasLoadResCount);
                if (hasLoadResCount == totLen) {
                    if (cb) cb.call(ctx);
                }
            });
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
