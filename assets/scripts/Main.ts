import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SceneMgr } from './framework/mgr/SceneMgr';
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        fgui.GRoot.create();
        SceneMgr.inst.push('LoadingScene',{msg:'我是LaodingScene'});
    }
    

}

