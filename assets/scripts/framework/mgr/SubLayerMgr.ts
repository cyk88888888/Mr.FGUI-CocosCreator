/*
 * @Description: 子界面管理器
 * @Author: CYK
 * @Date: 2022-05-19 15:25:36
 */
import { js } from "cc";
import { UILayer } from "../ui/UILayer";
export class SubLayerMgr {
    private _classMap: any;
    constructor() {
        this._classMap = {};
    }

    /**
     * 注册子页面
     * @param layerClass 
     */
    public register(layerClass: any, opt?: any) {
        let className = layerClass.__className;
        this._classMap[className] = layerClass;
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        let script: any = typeof LayerNameOrClass === 'string' ? js.getClassByName(LayerNameOrClass) : LayerNameOrClass;
        script.show();
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {

    }

    /**layer出栈 */
    public pop() {

    }
}
