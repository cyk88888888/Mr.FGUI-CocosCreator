/*
 * @Description: 组件基类
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node, js, path } from 'cc';
import { emmiter } from '../base/Emmiter';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
@ccclass('UIComp')
export class UIComp extends Component {
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    private _objTapMap: { [objName: string]: Function };//已添加的显示对象点击事件的记录
    private _tweenTargetList: any[];//已添加缓动的对象列表
    protected view: fgui.GComponent;
    /** 包名称 */
    public static pkgName: string = '';
    public data: any;
    private isFirstEnter: boolean;
    private isInited: boolean;
    /**打开弹窗时是否需要动画 */
    protected needAnimation: boolean = true;
    protected dlgMaskName = '__mask: GGraph';
    __preload() {
        let self = this;
        self.onInited();
    }

    protected onInited() {
        let self = this;
        if (self.isInited) return;
        self.isInited = true;
        self.init();
        self.ctor_b();
        if (self["ctor"]) self["ctor"]();
        self.ctor_a();
        self.init_a();
    }

    protected init() { }

    protected init_a() { }

    protected ctor_b() { }

    protected ctor_a() { }

    protected onEnter_b() { }

    protected onEnter_a() { }

    protected onExit_b() { }

    protected onExit_a() { }

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
        self.initView(this.view);
    }

    public exitOnPush() {
        let self = this;
        self.dispose();
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
    protected initView(view: fgui.GComponent) {
        let self = this;
        self.view = view;
        self.initViewProperty();
        self.addBtnCLickListener();
        console.log('进入' + self.node.name);
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        if (!self.isFirstEnter) {
            self.isFirstEnter = true;
            if (self["onFirstEnter"]) self["onFirstEnter"]();
        }
        self.onEnter_a();
    }

    /** 初始化属性 */
    private initViewProperty() {
        let self = this;
        if (!self.view) return;
        let children = self.view._children;
        for (let key in children) {
            let obj = children[key];
            self[obj.name] = obj;
            if (obj.node.name.indexOf(obj.name) == -1) obj.node.name = obj.name + ':  ' + obj.node.name;
            if (obj instanceof fgui.GComponent && obj.packageItem) {//如果是组件，添加对应脚本
                let scriptName = obj.packageItem.name;
                let isHasScript = js.getClassByName(scriptName);//是否有对应脚本类
                if (isHasScript) {
                    let oldCsript = obj.node.getComponent(scriptName) as UIComp;//节点上是否已有脚本
                    let script = oldCsript ? oldCsript : obj.node.addComponent(scriptName) as UIComp;
                    script.initView(obj);
                }
            }
            if (obj instanceof fgui.GList) {
                var pi: fgui.PackageItem = fgui.UIPackage.getItemByURL(obj.defaultItem + '');
                if (pi) {
                    let __class: any = js.getClassByName(pi.name);
                    if (__class) {
                        let url = 'ui://' + pi.owner.name + '/' + pi.name;
                        fgui.UIObjectFactory.setExtension(url, __class);
                        obj.setVirtual();//列表设置为复用列表
                        self.refreshList(obj.name);
                    }
                }
            }
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

    /**添加按钮点击事件监听**/
    protected addBtnCLickListener() {
        let self = this;
        if (!self.view) return;
        let children = self.view._children;
        self._objTapMap = {};
        for (let key in children) {
            let obj = children[key];
            let objName = obj.name;
            //监听元素点击事件
            if (obj instanceof fgui.GObject) {
                if (self["_tap_" + objName]) {
                    let tapFunc = self["_tap_" + objName];
                    let eventName = fgui.Event.CLICK;
                    self._objTapMap[objName + '&' + eventName] = tapFunc;
                    obj.on(eventName, tapFunc, self);
                }
            }

            //监听列表子项点击事件
            if (obj instanceof fgui.GList) {
                if (self['_click_' + obj.name]) {
                    let tapFunc = self["_click_" + obj.name];
                    let eventName = fgui.Event.CLICK_ITEM;
                    self._objTapMap[objName + '&' + eventName] = tapFunc;
                    obj.on(eventName, tapFunc, this);
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
        let matchObj = this.name.match(/<(\S*)>/);
        return matchObj ? matchObj[1] : this.name;
    }

    private timeoutIdArr: number[];
    protected setTimeout(cb: () => void, timeout: number) {
        if (!this.timeoutIdArr) this.timeoutIdArr = [];
        let timeoutId = setTimeout(() => {
            cb.call(this);
        }, timeout);
        this.timeoutIdArr.push(timeoutId);
    }

    private intervalIdArr: number[];
    protected setInterval(cb: () => void, timeout: number) {
        if (!this.intervalIdArr) this.intervalIdArr = [];
        let intervalId = setInterval(() => {
            cb.call(this);
        }, timeout);
        this.intervalIdArr.push(intervalId);
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
            if (self.view) self.view.node.destroy();
        });
    }

    private dispose() {
        let self = this;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }

        /** 调用node.destory()后会自动注销注册的点击事件,所以注销自定义事件前先判断node.isValid*/
        if (self._objTapMap) {
            for (let key in self._objTapMap) {
                let splitKey = key.split('&');
                let objName = splitKey[0];
                let eventName = splitKey[1];
                let obj = self[objName];
                if (obj.node.isValid) {
                    obj.off(eventName, self._objTapMap[key], self);
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
        console.log('退出' + this.node.name);
        this.onExit_b();
        if (self["onExit"]) self["onExit"]();
        this.onExit_a();
    }

    onDestroy() {
        let self = this;
        this.dispose();
        self.view = null;
        // if(self.view) self.view.dispose();
    }

}

