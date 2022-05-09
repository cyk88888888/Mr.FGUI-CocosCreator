import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { Layer } from '../../framework/Layer';
@ccclass('Home')
export class Home extends Layer {

    protected onEnter(){
        let self = this;
        console.log('进入Home界面了！！！！！！！！！！！！');
        
    }

    private _tap_bottom(){
        console.log('点击的底部按钮！！！！！！！！！！！！');
        
    }
}

