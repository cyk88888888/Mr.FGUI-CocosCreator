/*
 * @Description: 音效管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import * as fgui from "fairygui-cc";
import { director, Color, view, Vec2, AudioClip, View, AudioSourceComponent, Event, Node, AudioSource } from "cc";
import { ResMgr } from "./ResMgr";
export class SoundMrg {
    private static _inst: SoundMrg;
    public static get inst() {
        if (!this._inst) {
            this._inst = new SoundMrg();
        }
        return this._inst;
    }

    /**默认背景音乐 */
    public defaultBgMusic: string;
    public curBgMusic: string;

    /**播放默认背景音乐 */
    public playMainBg(){
        if(!this.defaultBgMusic) return;
        this.playBg(this.defaultBgMusic);
    }

    /**播放背景音乐 */
    public playBg(url: string) {
        if(this.curBgMusic == url) return;
        let mainNode = director.getScene().getChildByName('Main');
        let audioSource = mainNode.getComponent(AudioSource);
        var pi: fgui.PackageItem = fgui.UIPackage.getItemByURL(url);
        if (pi) {
            var sound: AudioClip = <AudioClip>pi.owner.getItemAsset(pi);
            if (sound) {
                this.curBgMusic = url;
                audioSource.stop();
                audioSource.clip = sound;
                audioSource.play();
            }
        }else{
            // ResMgr.inst.load()
        }
    }

}

