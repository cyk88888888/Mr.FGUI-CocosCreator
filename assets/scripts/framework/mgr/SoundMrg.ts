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

    private _defaultBgMusic: string;
    public get defaultBgMusic() {
        return this._defaultBgMusic;
    }
    /**设置默认背景音乐 */
    public set defaultBgMusic(value: string) {
        this._defaultBgMusic = value;
        this.playMainBg();
    }
    public curBgMusic: string;

    /**播放默认背景音乐 */
    public playMainBg() {
        if (!this.defaultBgMusic) return;
        this.playBg(this.defaultBgMusic);
    }

    /**播放背景音乐 */
    public playBg(url: string) {
        if (this.curBgMusic == url) return;
        // ResMgr.inst.releaseRes(this.curBgMusic);//释放上个音效资源
        let mainNode = director.getScene().getChildByName('Main');
        let audioSource = mainNode.getComponent(AudioSource);
        var pi: fgui.PackageItem = fgui.UIPackage.getItemByURL(url);
        if (pi) {
            let sound: AudioClip = <AudioClip>pi.owner.getItemAsset(pi);
            doPlay(sound);
        } else {
            ResMgr.inst.load([url], () => {
                let sound = ResMgr.inst.get(url) as AudioClip;
                doPlay.call(this, sound);
            }, this)
        }

        function doPlay(audioClip: AudioClip) {
            if (audioClip) {
                this.curBgMusic = url;
                audioSource.stop();
                audioSource.clip = audioClip;
                audioSource.play();
            }
        }
    }

}

