import { _decorator, Component, Node } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
const { ccclass, property } = _decorator;

@ccclass('BottomTabLayer')
export class BottomTabLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private onEnter(){
        console.log('进入BottomTabLayer~~~~~');
    }

    // private _tap_grp_bottom(){
    //     console.log('grp_bottom');
    // }
    
    private _tap_btn_equip(){
        console.log("equip");
    } 

    private _tap_btn_shop(){
        console.log("shop");
    }

    private _tap_btn_home(){
        console.log("home");
    }

    private _tap_btn_tanlent(){
        console.log("tanlent");
    }

    private _tap_btn_setting(){
        console.log("setting");
    }
}

