/*
 * @Description: 背包弹窗
 * @Author: CYK
 * @Date: 2022-06-02 17:20:24
 */
import { _decorator } from 'cc';
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
    private _tempLen: number;
    private ctor() {

    }

    private onEnter() {
        let self = this;
        this._tempLen = 45;
        self.refreshList('list_bag');
        self.setSelectData(this._tempLen - 1);
    }

    private _data_list_bag() {
        let self = this;
        self._bagDataList = [];
        for (let i = 0; i < self._tempLen; i++) {
            self._bagDataList.push({ index: i, icon: "Icons/i" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 100) });
        }
        return self._bagDataList;
    }

    private _click_list_bag(item: BagIR, evt: any) {
        this.showDetail(item.data);
    }

    private setSelectData(selIdx: number, ani?: boolean) {
        let self = this;
        self.list_bag.selectedIndex = selIdx;
        self.list_bag.scrollToView(self.list_bag.selectedIndex, ani);
        self.showDetail(self._bagDataList[self.list_bag.selectedIndex]);
    }

    private showDetail(itemData: any) {
        this.n11.icon = itemData.icon;
        this.n13.text = itemData.count;
    }

    private _tap_btn_refresh() {
        let self = this;
        self._tempLen = 25;
        self.refreshList('list_bag');
        self.setSelectData(this._tempLen - 1, true);
    }
}