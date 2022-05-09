import * as fgui from "fairygui-cc";
export let layer: fgui.GComponent;
export let dlg: fgui.GComponent;
export let msg: fgui.GComponent;
export function init() {
    layer = addGCom2GRoot('layer');
    dlg = addGCom2GRoot('dlg');
    msg = addGCom2GRoot('msg');
}

/**
 * 添加层级容器到GRoot
 * @param name 名称
 * @returns 
 */
export function addGCom2GRoot(name: string): fgui.GComponent {
    let newCom = new fgui.GComponent();
    newCom.node.name = name;
    fgui.GRoot.inst.addChild(newCom);
    return newCom;
}
