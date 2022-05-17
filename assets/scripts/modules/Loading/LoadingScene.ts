import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
@ccclass('LoadingScene')
export class LoadingScene extends Component {
    onLoad() {
        this;
    }


}
registerModule('LoadingScene', false, [
    'UI/Loading'
]);

