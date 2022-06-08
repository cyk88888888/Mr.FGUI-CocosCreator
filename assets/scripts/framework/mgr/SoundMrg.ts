/*
 * @Description: 音效管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import * as fgui from "fairygui-cc";
import { director, AudioClip, Node, AudioSource } from "cc";
import { ResMgr } from "./ResMgr";
export class SoundMrg {
    private static _inst: SoundMrg;
    public static get inst() {
        if (!this._inst) {
            this._inst = new SoundMrg();
        }
        return this._inst;
    }
    /**音乐缓存最大个数 */
    public musicCacheMaxCount: number = 4;
    public musicCachePool: string[] = [];
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
        let self = this;
        if (self.curBgMusic == url) return;
        // ResMgr.inst.releaseRes(self.curBgMusic);//释放上个音效资源
        self.curBgMusic = url;
        let mainNode = director.getScene().getChildByName('Main');
        let audioSource = mainNode.getComponent(AudioSource);
        ResMgr.inst.loadWithoutJuHua(url, () => {
            let audioClip = ResMgr.inst.get(url) as AudioClip;
            if (self.curBgMusic != url || !audioClip) return;//加载完成的不是最后一次赋值的值
            audioSource.stop();
            audioSource.clip = audioClip;
            audioSource.play();
            if (self.musicCachePool.indexOf(url) == -1) self.musicCachePool.push(url);
            self.checkRealseMusic();
        }, self)
    }

    /**场景音效节点 */
    public subSoundNode: Node;
    /**
     * 播放音效
     * @param url 音效资源路径
     * @param isLoop 是否循环 
     */
    public playSound(url: string, loop?: boolean) {
        let self = this;
        if (!self.subSoundNode) return;
        let audioSource = self.subSoundNode.getComponent(AudioSource);
        ResMgr.inst.loadWithoutJuHua(url, () => {
            let audioClip = ResMgr.inst.get(url) as AudioClip;
            if (!audioClip) throw '音效资源不存在: ' + url;
            audioSource.loop = loop;
            audioSource.clip = audioClip;
            loop ? audioSource.play() : audioSource.playOneShot(audioClip);
            if (self.musicCachePool.indexOf(url) == -1) self.musicCachePool.push(url);
            self.checkRealseMusic();
        }, self)
    }

    /**检测释放音效资源 */
    private checkRealseMusic(){
        let self = this;
        if (self.musicCachePool.length > self.musicCacheMaxCount) {
            let shiftUrl = self.musicCachePool.shift();
            ResMgr.inst.releaseRes(shiftUrl);
        }
    }
}

