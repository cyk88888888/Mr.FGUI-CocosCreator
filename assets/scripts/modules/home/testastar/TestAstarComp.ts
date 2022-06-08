/*
 * @Description: Astar寻路
 * @Author: CYK
 * @Date: 2022-06-08 16:09:32
 */
import { _decorator, Component, Node, Color, Graphics } from 'cc';
import * as fgui from "fairygui-cc";
import { UIComp } from '../../../framework/ui/UIComp';
import { Grid } from '../../base/astar/Grid';
import { Nodes } from '../../base/astar/Nodes';
const { ccclass } = _decorator;

@ccclass('TestAstarComp')
export class TestAstarComp extends UIComp {

    private grp_container: fgui.GComponent;
    private graphicsGrid: fgui.GGraph;

    private _cellSize: number;//每一个格子的大小
    private _speed: number;//人物移动速度、
    private _grid: Grid;
    private _player: fgui.GGraph;
    private _index: number;
    private _path: Nodes[];
    private _pathShape: fgui.GGraph;//路过的格子轨迹，包含绘制终点

    private ctor() {
        let self = this;
        self._cellSize = 40;
        self._speed = 1;
    }

    private onEnter() {
        let self = this;
        self.makeGrid();
    }

    /** 生成网格，并随机放置一些障碍 */
    private makeGrid() {
        let self = this;
        let screenWh = self.screenWh;
        let width = screenWh[0];
        let height = screenWh[1];
        let numCols = Math.floor(width / self._cellSize);
        let numRows = Math.floor(height / self._cellSize);
        self._grid = new Grid(numCols, numRows);

        let lineGraphics = self.graphicsGrid._content;
        lineGraphics.clear();
        lineGraphics.lineWidth = 3;
        for (let i = 0; i < numCols + 1; i++)//画竖线
        {
            lineGraphics.moveTo(i * self._cellSize, 0);
            lineGraphics.lineTo(i * self._cellSize, numRows * self._cellSize);
        }


        for (let i = 0; i < numRows + 1; i++)//画横线
        {
            lineGraphics.moveTo(0, i * self._cellSize);
            lineGraphics.lineTo(numCols * self._cellSize, i * self._cellSize);
        }
        lineGraphics.stroke();
    }

    private get screenWh() {
        let self = this;
        return [self.view.width, self.view.height];
    }
}

