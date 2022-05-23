/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-19 11:39:05
 */
import { Size } from "cc";
import * as fgui from "fairygui-cc";
import { scaleMode } from "./ScaleMode";
export namespace BaseUT{
    /**
     * 根据屏幕宽高自适应设置comp大小
     * @param comp 
     * @returns 
     */
    export function setFitSize(comp: fgui.GComponent): Size{
        let designHeight = fgui.GRoot.inst.height < scaleMode.designHeight_max ? fgui.GRoot.inst.height : scaleMode.designHeight_max;
        comp.setSize(scaleMode.designWidth, designHeight);
        return new Size(scaleMode.designWidth, designHeight);
    }
}