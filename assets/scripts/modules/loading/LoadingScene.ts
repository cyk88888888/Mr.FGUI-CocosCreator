import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIScene } from '../../framework/ui/UIScene';
import { Loading } from './Loading';
@ccclass('LoadingScene')
export class LoadingScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = Loading;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }
}
registerModule(LoadingScene, ['UI/Loading']);

