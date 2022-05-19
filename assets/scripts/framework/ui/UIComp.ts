
import { _decorator, Component, Node } from 'cc';
import { emmiter } from '../base/Emmiter';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
@ccclass('UIComp')
export class UIComp extends Component {
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    private _objTapMap: { [objName: string]: Function };//已添加的显示对象点击事件的记录
    protected view: fgui.GComponent;
    /** 包名称 */
    public static pkgName: string = '';
    public data: any;
    constructor() {
        super();
        let self = this;
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

    public setData(data: any) {
        this.data = data;
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
        if (!this.view) {
            this.view = view;
            this.addBtnCLickListener();
        }
    }

    protected static addScript() { return null }

    /**添加按钮点击事件监听**/
    protected addBtnCLickListener() {
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
    private _className: string;
    public get __className(): string {
        if (!this._className) {
            let matchObj = this.name.match(/<(\S*)>/);
            this._className = matchObj ? matchObj[1] : this.name;
        }
        return this._className;
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
        }

        if (self.intervalIdArr) {
            for (let i = 0; i < self.intervalIdArr.length; i++) {
                clearInterval(self.intervalIdArr[i]);
            }
            self.intervalIdArr = null;
        }
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
                let obj: fgui.GObject = children[objName];
                if (obj && obj instanceof fgui.GObject) obj.offClick(self._objTapMap[objName], self);
            }
            self._objTapMap = null;
        }

        self.clearAllTimeoutOrInterval();
    }

    onDestroy() {
        let self = this;
        // if(self.view) self.view.dispose();
        this.dispose();
        this.onExit_b();
        if (self["onExit"]) self["onExit"]();
        this.onExit_a();
    }

}

