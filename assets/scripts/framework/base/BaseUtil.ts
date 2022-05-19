import { Size } from "cc";
import * as fgui from "fairygui-cc";
import { scaleMode } from "./ScaleMode";
export namespace BaseUT{
    export function setSize(comp: fgui.GComponent): Size{
        let designHeight = fgui.GRoot.inst.height < scaleMode.designHeight_max ? fgui.GRoot.inst.height : scaleMode.designHeight_max;
        comp.setSize(scaleMode.designWidth, designHeight);
        return new Size(scaleMode.designWidth, designHeight);
    }
}