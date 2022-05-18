import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { UIScene } from '../../framework/ui/UIScene';
import { JuHuaDlg } from '../common/JuHuaDlg';
import { Loading } from './Loading';
@ccclass('LoadingScene')
export class LoadingScene extends UIScene {
    onLoad() {
        Loading.show({ str: '哈啊哈哈' });
        // JuHuaDlg.show();
    }
}
registerModule('LoadingScene', ['UI/Common','UI/Loading'], false);

