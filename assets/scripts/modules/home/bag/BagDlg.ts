/*
 * @Description: 背包弹窗
 * @Author: CYK
 * @Date: 2022-06-02 17:20:24
 */
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIDlg } from '../../../framework/ui/UIDlg';
import { BagIR } from './BagIR';

@ccclass('BagDlg')
export class BagDlg extends UIDlg {
    /** 包名称 */
    public static pkgName: string = 'home';

    private list: fgui.GList;
    private n11: fgui.GLoader;
    private n13: fgui.GTextField;

    private _bagDataList: any[];
    private onEnter() {
        let self = this;
        self._bagDataList = [];
        self.list.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        // self.list.itemRenderer = <fgui.ListItemRenderer>this.renderListItem.bind(this);
        // self.list.setVirtual();
        self.list.numItems = 45;
        self.list.selectedIndex = 1;
        self.onClickItem(self.list.getChildAt(self.list.selectedIndex));
    
        // self.list.addSelection(0, true);
    }

    private renderListItem(index: number, item: BagIR): void {
        item.icon = "Icons/i" + Math.floor(Math.random() * 10);
        item.text = "" + Math.floor(Math.random() * 100);
    }

    private onClickItem(item: BagIR): void {
        this.n11.icon = item.loader.icon;
        this.n13.text = item.count.text;
    }
}