/*
 * @Description: 组件基类
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, js } from 'cc';
import { emmiter } from '../base/Emmiter';
import * as fgui from "fairygui-cc";
import { TickMgr } from '../mgr/TickMgr';
import { BaseUT } from '../base/BaseUtil';
export class UIComp extends fgui.GComponent {
    public curParent: fgui.GComponent;
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    private _objTapMap: { [objName: string]: any };//已添加的显示对象点击事件的记录
    private chilidCompClassMap: { [className: string]: UIComp };//子组件的控制脚本类
    private _tweenTargetList: any[];//已添加缓动的对象列表
    protected view: fgui.GComponent;
    /** 包名称 */
    public static pkgName: string = '';
    public data: any;
    private isFirstEnter: boolean = true;
    /**打开弹窗时是否需要动画 */
    protected needAnimation: boolean = true;
    protected dlgMaskName = '__mask: GGraph';//弹窗底部灰色rect名称
    protected hasDestory: boolean;//是否已被销毁
    private _allList: fgui.GList[];
    protected needRefreshListOnEnter: boolean = true;
    public constructor() {
        super();
        // unNeedInitMap[this.id] = 1
    }

    /**初始化，一定要在子类的构造函数中调用（这样设计是因为cocos采用babel编译ts，如果在父类构造函数里统一调用init，会导致子类里异步回调中无法获取子类自身定义的属性值） */
    protected init() {
        if (unNeedInitMap[this.id]) return;
        this.on(fgui.Event.ADD_TO_SATGE, this.onAddToStage, this);
        this.on(fgui.Event.REMOVE_FROM_SATGE, this.onRemoveFromStage, this);
        let className = this.className;
        let scriptClass = js.getClassByName(className);//是否有对应脚本类
        if (!scriptClass) throw '未找到' + className + '类脚本';
        fgui.UIPackage.createObject(scriptClass['pkgName'], className, null, this.onCreateUIObject, this).asCom;
    }

    private onAddToStage() {
        this.parent.addChild(this.view);
        this.removeFromParent();
        this.onViewAdd();
    }

    private onRemoveFromStage() {

    }

    private onCreateUIObject(viewObj: fgui.GComponent) {
        this.view = viewObj;
        BaseUT.setFitSize(this.view);
        this.view.node.name = this.node.name = this.className;
        this.initView();
    }

    protected onEnter_b() { }

    protected onEnter_a() { }

    protected onExit_b() { }

    protected onExit_a() { }

    protected onViewAdd() { }
    /**打开页面时的动画 */
    protected onOpenAnimation() { }
    /**关闭页面时的动画 */
    protected onCloseAnimation(callback?: Function) {
        if (callback) callback.call(this);
    }

    public setData(data: any) {
        this.data = data;
        if (this['dchg']) this['dchg']();
    }

    public enterOnPop() {
        let self = this;
        self.initView();
    }

    public exitOnPush() {
        let self = this;
        self._dispose();
    }

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
     * 初始化view
     */
    private initView(needReflectProperty: boolean = true) {
        let self = this;
        if (self.hasDestory) return;
        this.initViewProperty(needReflectProperty);
        self.addListener();
        console.log('进入' + self.className);
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        if (self.isFirstEnter) {
            self.isFirstEnter = false;
            if (self["onFirstEnter"]) self["onFirstEnter"]();
        }
        self.onEnter_a();
        self.refreshAllList();

        if (self['update']) {
            TickMgr.inst.addTick(this.className, { cb: self['update'], ctx: self });
        }
    }

    /** 初始化属性 */
    private initViewProperty(needReflectProperty: boolean = true) {
        let self = this;
        if (!self.view) return;
        let children = self.view._children;
        if (!self.chilidCompClassMap) self.chilidCompClassMap = {};
        if (!self._allList) self._allList = [];
        for (let key in children) {
            let obj = children[key];
            if (needReflectProperty) self[obj.name] = obj;
            if (needReflectProperty && obj.node.name.indexOf(obj.name) == -1) obj.node.name = obj.name + ':  ' + obj.node.name;
            if (obj instanceof fgui.GComponent && obj.packageItem) {//如果是组件，添加对应脚本
                let scriptName = obj.packageItem.name;
                let scriptClass = js.getClassByName(scriptName);//是否有对应脚本类
                if (scriptClass) {
                    let oldScript = self.chilidCompClassMap[obj.name];
                    let script = oldScript ? oldScript : new scriptClass();
                    if (oldScript) {
                        script['initView'](false);
                    } else {
                        self.chilidCompClassMap[obj.name] = script as UIComp;
                        script['view'] = obj;
                        script['initView']();
                    }
                }
            }

            if (needReflectProperty && obj instanceof fgui.GList) {
                var pi: fgui.PackageItem = fgui.UIPackage.getItemByURL(obj.defaultItem + '');
                if (pi) {
                    let __class: any = js.getClassByName(pi.name);
                    if (__class) {
                        let url = 'ui://' + pi.owner.name + '/' + pi.name;
                        fgui.UIObjectFactory.setExtension(url, __class);//注册列表子项
                        obj.setVirtual();//列表设置为复用列表
                        self._allList.push(obj);
                    }
                }
            }

        }
    }

    /**刷新所有列表 */
    private refreshAllList() {
        let self = this;
        if (!self.needRefreshListOnEnter) return;
        for (let i = 0; i < self._allList.length; i++) {
            self.refreshList(self._allList[i].name);
        }
    }

    /**
     * 刷新列表数据
     * @param listId 列表id名称
     */
    protected refreshList(listId: string) {
        let self = this;
        if (self[listId] && self['_data_' + listId]) {
            let dataList = self['_data_' + listId]();
            self[listId].itemRenderer = function (index: number, item: any) { item.setData(dataList[index]); };
            self[listId].numItems = dataList.length;
        }
    }

    /**添加事件监听**/
    private addListener() {
        let self = this;
        if (!self.view) return;
        let children = self.view._children;
        self._objTapMap = {};

        let eventFuncName = '_size_change_' + self.view.name;
        if (self[eventFuncName]) {
            let eventName = fgui.Event.SIZE_CHANGED;
            self.view.on(fgui.Event.SIZE_CHANGED, self[eventFuncName], self);
            self._objTapMap[eventFuncName + '&' + eventName] = self.view;
        }

        for (let key in children) {
            let obj = children[key];
            let objName = obj.name;
            //监听元素点击事件
            if (obj instanceof fgui.GObject) {
                let eventFuncName = "_tap_" + objName;
                if (self[eventFuncName]) {
                    let eventName = fgui.Event.CLICK;
                    obj.on(eventName, self[eventFuncName], self);
                    self._objTapMap[eventFuncName + '&' + eventName] = obj;
                }
                eventFuncName = '_size_change_' + objName;
                if (self[eventFuncName]) {
                    let eventName = fgui.Event.SIZE_CHANGED;
                    obj.on(fgui.Event.SIZE_CHANGED, self[eventFuncName], self);
                    self._objTapMap[eventFuncName + '&' + eventName] = obj;
                }
            }

            //监听列表子项点击事件
            if (obj instanceof fgui.GList) {
                let eventFuncName = '_click_' + obj.name;
                if (self[eventFuncName]) {
                    let eventName = fgui.Event.CLICK_ITEM;
                    obj.on(eventName, self[eventFuncName], self);
                    self._objTapMap[eventFuncName + '&' + eventName] = obj;
                }
            }
        }
        if (self['btn_close']) {
            self['btn_close'].onClick(self.close, self);
        }

        let btnClose = self['frame']?.getChild('closeButton');
        if (btnClose) {
            btnClose.onClick(self.close, self);
        }
    }

    /**获取指定对象的缓动Tweener */
    protected getTween(target: any, propType?: any) {
        if (!this._tweenTargetList) {
            this._tweenTargetList = [];
        }
        if (this._tweenTargetList.indexOf(target) == -1) this._tweenTargetList.push(target);

        return fgui.GTween.getTween(target, propType);
    }

    /**清除指定对象的缓动Tweener */
    protected rmTween(target: any, complete?: boolean, propType?: any) {
        fgui.GTween.kill(target, complete, propType);
    }

    /**清除所有对象的缓动 */
    private rmAllTweens() {
        if (this._tweenTargetList) {
            for (let i = 0; i < this._tweenTargetList.length; i++) {
                this.rmTween(this._tweenTargetList[i]);
            }
        }
        this._tweenTargetList = null;
    }

    public static get __className(): string {
        return this.name;
    }

    protected get className() {
        return this.constructor.name;
    }

    private timeoutIdArr: number[];
    protected setTimeout(cb: () => void, timeout: number) {
        if (!this.timeoutIdArr) this.timeoutIdArr = [];
        let timeoutId = setTimeout(() => {
            cb.call(this);
        }, timeout);
        this.timeoutIdArr.push(timeoutId);
        return timeoutId;
    }

    private intervalIdArr: number[];
    protected setInterval(cb: () => void, timeout: number) {
        if (!this.intervalIdArr) this.intervalIdArr = [];
        let intervalId = setInterval(() => {
            cb.call(this);
        }, timeout);
        this.intervalIdArr.push(intervalId);
        return intervalId;
    }

    /**
     * 清除所有的setTimeout和setInterval定时器
     */
    protected clearAllTimeoutOrInterval() {
        let self = this;
        if (self.timeoutIdArr) {
            for (let i = 0; i < self.timeoutIdArr.length; i++) {
                clearTimeout(self.timeoutIdArr[i]);
            }
            self.timeoutIdArr = null;
            console.log('清除timeoutIdArr: ' + self.node.name);
        }

        if (self.intervalIdArr) {
            for (let i = 0; i < self.intervalIdArr.length; i++) {
                clearInterval(self.intervalIdArr[i]);
            }
            self.intervalIdArr = null;
            console.log('清除intervalIdArr: ' + self.node.name);
        }
    }

    public close() {
        let self = this;
        self.onCloseAnimation(() => {
            self.destory();
        });
    }

    public addView() {
        this.curParent.addChild(this.view);
    }

    public removeView() {
        let self = this;
        self.view.removeFromParent();
    }

    public destory() {
        let self = this;
        if (self.hasDestory) return;
        self._dispose();
        self.off(fgui.Event.ADD_TO_SATGE, this.onAddToStage, this);
        self.off(fgui.Event.REMOVE_FROM_SATGE, this.onRemoveFromStage, this);
        self.chilidCompClassMap = null;
        self._allList = null;
        self.view.dispose();
        self.dispose();
        self.hasDestory = true;
    }

    private _dispose() {
        let self = this;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }

        if (self._objTapMap) {
            for (let key in self._objTapMap) {
                let splitKey = key.split('&');
                let eventFuncName = splitKey[0];
                let eventName = splitKey[1];
                let obj = self._objTapMap[key];
                if (obj.node.isValid) {
                    obj.off(eventName, self[eventFuncName], self);
                }
            }
            self._objTapMap = null;
        }

        if (self.view) {
            let bgMask = this.view.getChild(self.dlgMaskName);
            let hasClickListener = bgMask && bgMask.node.isValid && bgMask.hasClickListener();
            if (hasClickListener) bgMask.offClick(self.close, self);
        }

        self.clearAllTimeoutOrInterval();
        self.rmAllTweens();

        //子组件退出
        for (let key in self.chilidCompClassMap) {
            let script = self.chilidCompClassMap[key];
            script['exitOnPush']();
        }

        if (self['update']) {
            TickMgr.inst.rmTick(this.className);
        }

        console.log('退出' + this.className);
        this.onExit_b();
        if (self["onExit"]) self["onExit"]();
        this.onExit_a();
    }
}

export let unNeedInitMap: { [key: string]: number } = {};

