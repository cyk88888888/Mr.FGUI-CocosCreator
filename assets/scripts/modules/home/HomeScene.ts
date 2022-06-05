/*
 * @Description: 主场景
 * @Author: CYK
 * @Date: 2022-05-20 09:53:18
 */
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIMenuLayer } from '../../framework/ui/UIMenuLayer';
import { UIScene } from '../../framework/ui/UIScene';
import { BottomTabLayer } from './BottomTabLayer';
import { EquipLayer } from './equip/EquipLayer';
import { HomeLayer } from './HomeLayer';
import { SettingLayer } from './setting/SettingLayer';
import { ShopLayer } from './shop/ShopLayer';
import { SkillLayer } from './skill/SkillLayer';
import { TopInfoLayer } from './TopInfoLayer';
@ccclass('HomeScene')
export class HomeScene extends UIScene {
    private top: UIMenuLayer;
    private bottom: UIMenuLayer;
    private ctor() {
        let self = this;
        self.mainClassLayer = HomeLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [HomeLayer, SettingLayer, EquipLayer, ShopLayer, SkillLayer];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    private onEnter() {
        let self = this;
        self.onEmitter('jumpToLayer', self.jumpToLayer);
        if (!this.top) this.top = <UIMenuLayer>TopInfoLayer.show();
        if (!this.bottom) this.bottom = <UIMenuLayer>BottomTabLayer.show();
    }

    private jumpToLayer(data: any) {
        let self = this;
        if (!data) {
            console.error('跳转数据为null');
            return;
        }
        self.run(data.layerName);
    }
    private onExit() {
    }
}
registerModule(HomeScene, ['ui/home'], true);

