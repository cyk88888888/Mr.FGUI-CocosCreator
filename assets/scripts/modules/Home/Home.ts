import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('Home')
export class Home extends UILayer {

    protected onEnter() {
        let self = this;
        self.onEmitter('clickBottom', () => {
            console.log('点击的底部按钮！！！！！！！！！！！！');
        })
    }

    private _tap_bottom() {
        this.emit('clickBottom');
    }
}

