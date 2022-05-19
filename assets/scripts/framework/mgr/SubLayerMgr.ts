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
