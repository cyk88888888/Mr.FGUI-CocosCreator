
import { _decorator, Component, Node } from 'cc';
import { emmiter } from '../base/Emmiter';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
@ccclass('UIComp')
export class UIComp extends Component {
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    private _objTapMap: { [objName: string]: Function };//已添加的显示对象点击事件的记录
    protected view: fgui.GComponent;
    protected uiPath: string;
    constructor() {
        super();
        let self = this;
        self.ctor_b();
        if (self["ctor"]) self["ctor"]();
        self.ctor_a();
    }

    protected ctor_b() { }

    protected ctor_a() { }

    protected onEnter_b() { }

    protected onEnter_a() { }

    protected onExit_b() { }

    protected onExit_a() { }

    protected onEmitter(event: string, listener: any) {
        let self = this;
        emmiter.on(event, listener, self);
        if (!self._emmitMap) self._emmitMap = {};
        self._emmitMap[event] = listener;
    }

    protected unEmitter(event: string, listener: any) {
        let self = this;
        emmiter.off(event, listener, self);
    }

    protected emit(event: string, data?: any) {
        emmiter.emit(event, data)
    }

    /**
     * 显示界面
     * @param pkgName 资源包名
     * @param callBack 加载完毕回调
     * @param ctx 
     * @returns 
     */
    public static show(pkgName: string, callBack?: Function, ctx?: any): UIComp {
        let self = this;
        self.inst.uiPath = 'UI/' + pkgName;
        self.inst._className = self.name;
        if (pkgName && !fgui.UIPackage.getByName(pkgName)) {//缓存未找到
            fgui.UIPackage.loadPackage(self.inst.uiPath, this.onUILoaded.bind(this, callBack, ctx));//加载资源包
        } else {
            this.onUILoaded.bind(this, callBack, ctx);
        }
        return self.inst;
    }

    private static onUILoaded(callBack?: Function, ctx?: any) {
        let self = this;
        if (callBack) callBack.call(ctx);
        self.inst.view = fgui.UIPackage.createObject(self.name, self.name).asCom;
        self.inst.view.node.name = this.name;
        self.inst.addToLayer();
        self.inst.onEnter_b();
        self.inst['onEnter']();
        self.inst.onEnter_a();
        self.inst.addBtnCLickListener();
    }
    protected addToLayer() { }
    protected static addScript(): UIComp { return null }
    private static _inst: UIComp;
    protected static get inst(): UIComp {
        let self = this;
        if (!this._inst) this._inst = self.addScript();
        return this._inst;
    }

    /**添加按钮点击事件监听**/
    private addBtnCLickListener() {
        let self = this;
        let children = self.view._children;
        self._objTapMap = {};
        for (let key in children) {
            let obj = children[key];
            if (obj instanceof fgui.GObject) {
                let objName = obj.name;
                if (self["_tap_" + objName]) {
                    let tapFunc = self["_tap_" + objName];
                    self._objTapMap[objName] = tapFunc;
                    obj.onClick(tapFunc, self);
                }
            }
        }
    }
    private _className:string;
    public get __className(): string {
        let self = this;
        return self._className;
    }

    public close() {
        let self = this;
        self.destroy();
    }

    private dispose() {
        let self = this;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }

        if (self._objTapMap) {
            let children = self.view._children;
            for (let objName in self._objTapMap) {
                let obj:fgui.GObject = children[objName];
                if (obj && obj instanceof fgui.GObject) obj.offClick(self._objTapMap[objName], self);
            }
            self._objTapMap = null;
        }

        if (self.uiPath) fgui.UIPackage.removePackage(self.__className);//卸载资源包
    }

    onDestroy() {
        let self = this;
        this.dispose();
        this.onExit_b();
        if (self["onExit"]) self["onExit"]();
        this.onExit_a();
        this.view.dispose();
    }

}

