import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIScene } from '../../framework/ui/UIScene';
import { Home } from './Home';
@ccclass('HomeScene')
export class HomeScene extends UIScene {
    onLoad() {
        Home.show({str: '哈啊哈哈Home'});
    }
}
registerModule('HomeScene', ['UI/Home'], true);

