/*
 * @Description: UI场景基类
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { UIComp } from './UIComp';
import * as fgui from "fairygui-cc";
import { SubLayerMgr } from '../mgr/SubLayerMgr';
import { UILayer } from './UILayer';
import { emmiter } from '../base/Emmiter';
import { BaseUT } from '../base/BaseUtil';

export class UIScene {
    protected mainClassLayer: typeof UILayer;
    protected subLayerMgr: SubLayerMgr;
    public layer: fgui.GComponent;
    public dlg: fgui.GComponent;
    public msg: fgui.GComponent;
    public menuLayer: fgui.GComponent;

    private _moduleParam: any;
    private _isFirstEnter: boolean = true;
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    public entity: fgui.GComponent;//场景实体
    private _chilidCompClassMap: { [className: string]: any };//当前场景每个层级的UIComp的控制脚本类
    constructor() {
        let self = this;
        self.subLayerMgr = new SubLayerMgr();
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

    public get className() {
        return this.constructor.name;
    }

    /**场景初始化 */
    public _init_(sceneName: string, data?: any) {
        let self = this;
        self._chilidCompClassMap = {};
        self.createEntityAndLayer(sceneName, data);

        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        if (self._isFirstEnter) {
            self._isFirstEnter = false;
            if (self["onFirstEnter"]) self["onFirstEnter"]();
        }
        if (self.mainClassLayer) {
            self.subLayerMgr.register(self.mainClassLayer);
            self.push(self.mainClassLayer, { str: '我叫' + self.mainClassLayer.name });
        }
    }

    /**创建实体和子layer层 */
    private createEntityAndLayer(sceneName: string, data: any) {
        this.entity = this.addGCom2GRoot(sceneName, true);
        this.initLayer();
        this.layer = this.layer;
        this.dlg = this.dlg;
        this.msg = this.msg;
        this.menuLayer = this.menuLayer;
        this.setData(data);
    }

    private initLayer() {
        let self = this;
        self.layer = self.addGCom2GRoot('UILayer');
        self.menuLayer = self.addGCom2GRoot('UIMenuLayer');
        self.dlg = self.addGCom2GRoot('UIDlg');
        self.msg = self.addGCom2GRoot('UIMsg');
    }

    /**
    * 添加层级容器到GRoot
    * @param name 名称
    * @returns 
    */
    private addGCom2GRoot(name: string, isScene?: boolean): fgui.GComponent {
        let newCom = new fgui.GComponent();
        newCom.node.name = name;
        let size = BaseUT.setFitSize(newCom);
        if (isScene) {
            newCom.x = (fgui.GRoot.inst.width - size.width) / 2;
            newCom.y = (fgui.GRoot.inst.height - size.height) / 2;
        }
        let parent = isScene ? fgui.GRoot.inst : this.entity;
        parent.addChild(newCom);
        return newCom;
    }

    public setData(data: any) {
        this._moduleParam = data;
    }

    public setChildLayerClass(classEtity: UIComp) {
        this._chilidCompClassMap[classEtity.node.name] = classEtity;
    }

    public get chilidCompClassMap() {
        return this._chilidCompClassMap;
    }

    public enterOnPop() {
        let self = this;
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        self.onEnter_a();
    }

    public exitOnPush() {
        let self = this;
        self._dispose();
    }

    /**重置到主界面（会清掉当前堆栈中的所有界面） */
    public resetToMain() {
        let self = this;
        self.releaseAllLayer();
        self.push(self.mainClassLayer, {});
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.run(LayerNameOrClass, data);
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.push(LayerNameOrClass, data);
    }

    /**layer出栈 */
    public pop() {
        this.subLayerMgr.pop();
    }

    public get node() {
        return this.entity.node;
    }

    public addToGRoot() {
        fgui.GRoot.inst.addChild(this.entity);
    }

    public removeFromParent() {
        this.entity.removeFromParent();
    }

    /**清除所有layer */
    public releaseAllLayer() {
        this.subLayerMgr.releaseAllLayer();
    }

    public disposeSubLayerMgr() {
        this.subLayerMgr.dispose();
        this.subLayerMgr = null;
    }

    public _dispose() {
        let self = this;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }
        this.onExit_b();
        if (self["onExit"]) self["onExit"]();
        this.onExit_a();
    }

    public destory() {
        this._dispose();
        this.subLayerMgr.dispose();
        this.subLayerMgr = null;
        this._chilidCompClassMap = null;
        this.entity.dispose();
    }
}

