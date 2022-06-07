/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-06-07 00:34:35
 */
import { _decorator } from 'cc';
import * as fgui from "fairygui-cc";
const { ccclass, property } = _decorator;
@ccclass('ListItemRenderer')
export class ListItemRenderer extends fgui.GButton {
    public data: any;

    protected ctor_b() { }

    protected ctor_a() { }

    protected onEnter_b() { }

    protected onEnter_a() { }

    protected onExit_b() { }

    protected onExit_a() { }


    public constructor() {
        super();
        let self = this;
        self.ctor_b();
        if (self["ctor"]) self["ctor"]();
        self.ctor_a();
    }

    public setData(data: any) {
        this.data = data;
        if(this['dchg']) this['dchg']();
    }

    protected onConstruct(): void {
        let self = this;
        self.initViewProperty();
    }

    /** 初始化属性 */
    private initViewProperty() {
        let self = this;
        let children = self._children;
        for (let key in children) {
            let obj = children[key];
            self[obj.name] = obj;
            if (obj.node.name.indexOf(obj.name) == -1) obj.node.name = obj.name + ':  ' + obj.node.name;
        }
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        self.onEnter_a();
    }
}