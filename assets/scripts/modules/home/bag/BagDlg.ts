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

    private list_bag: fgui.GList;
    private n11: fgui.GLoader;
    private n13: fgui.GTextField;

    private _bagDataList: any[];
    private onEnter() {
        let self = this;
        self.list_bag.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        self.list_bag.selectedIndex = 0;
        self.list_bag.scrollToView(self.list_bag.selectedIndex);
        // self.list_bag.addSelection(20, true);
        self.onClickItem(self.list_bag.getChildAt(self.list_bag.selectedIndex), null);
    }

    private _data_list_bag() {
        let self = this;
        self._bagDataList = [];
        for (let i = 0; i < 45; i++) {
            self._bagDataList.push({ index: i, icon: "Icons/i" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 100) });
        }
        return self._bagDataList;
    }

    private onClickItem(item: BagIR, evt: any): void {
        let itemData = item.data;
        this.n11.icon = itemData.icon;
        this.n13.text = itemData.count;
    }
}