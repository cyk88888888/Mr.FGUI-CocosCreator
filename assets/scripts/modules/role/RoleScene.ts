/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-21 11:43:21
 */
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIScene } from '../../framework/ui/UIScene';
import { RoleLayer } from './RoleLayer';
@ccclass('RoleScene')
export class RoleScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = RoleLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }
}
registerModule(RoleScene, ['ui/role']);

