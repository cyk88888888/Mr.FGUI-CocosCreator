/*
 * @Description: 子界面管理器
 * @Author: CYK
 * @Date: 2022-05-19 15:25:36
 */
export class SubLayerMgr {
    private classMap: any;
    constructor() {
        this.classMap = {};
    }

    /**
     * 注册子页面
     * @param layerClass 
     */
    public register(layerClass: any, opt?: any) {
        this.classMap[layerClass] = opt;
    }
}
