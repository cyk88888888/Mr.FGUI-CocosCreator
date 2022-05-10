import * as fgui from "fairygui-cc";

export class LayerMgr {
    private static _inst: LayerMgr;
    public layer: fgui.GComponent;
    public dlg: fgui.GComponent;
    public msg: fgui.GComponent;
    public static get inst() {
        if (!this._inst) {
            this._inst = new LayerMgr();
        }
        return this._inst;
    }

    init() {
        let self = this;
        self.layer = self.addGCom2GRoot('layer');
        self.dlg = self.addGCom2GRoot('dlg');
        self.msg = self.addGCom2GRoot('msg');
    }

    /**
    * 添加层级容器到GRoot
    * @param name 名称
    * @returns 
    */
    addGCom2GRoot(name: string): fgui.GComponent {
        let newCom = new fgui.GComponent();
        newCom.node.name = name;
        newCom.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        fgui.GRoot.inst.addChild(newCom);
        return newCom;
    }

}
