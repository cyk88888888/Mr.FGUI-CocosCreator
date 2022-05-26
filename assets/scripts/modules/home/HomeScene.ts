/*
 * @Description: 主场景
 * @Author: CYK
 * @Date: 2022-05-20 09:53:18
 */
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIScene } from '../../framework/ui/UIScene';
import { BottomTabLayer } from './BottomTabLayer';
import { HomeLayer } from './HomeLayer';
@ccclass('HomeScene')
export class HomeScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = HomeLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    private onEnter(){
        let bottom = BottomTabLayer.show();
        console.log('进入HomeScene');
    }

    private onExit(){
        console.log('退出HomeScene');
    }
}
registerModule(HomeScene, ['ui/home'], true);

