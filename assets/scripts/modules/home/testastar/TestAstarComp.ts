/*
 * @Description: Astar寻路
 * @Author: CYK
 * @Date: 2022-06-08 16:09:32
 */
import { _decorator, Component, Node, Color, Graphics, EventTouch } from 'cc';
import * as fgui from "fairygui-cc";
import { UIComp } from '../../../framework/ui/UIComp';
import { AStar } from '../../base/astar/AStar';
import { Grid } from '../../base/astar/Grid';
import { Nodes } from '../../base/astar/Nodes';
const { ccclass } = _decorator;

@ccclass('TestAstarComp')
export class TestAstarComp extends UIComp {

    private grp_container: fgui.GComponent;
    private graphicsGrid: fgui.GGraph;
    private graphicsPath: fgui.GGraph;
    private graphicsBlock: fgui.GGraph;
    private graphicsPlayer: fgui.GGraph;


    private _cellSize: number;
    private _grid: Grid;
    private _index: number;
    private _path: Nodes[];
    private _startFrame: boolean;
    private _speed: number;//人物移动速度、

    private ctor() {
        let self = this;
        self._cellSize = 40;
        self._speed = 1;
    }

    // private onEnter() {
    //     let self = this;
    //     self.initGrid();
    //     self.onReset();
    // }

    private _size_change_astarComp(){
        let self = this;
        self.initGrid();
        self.onReset(); 
    }

    /** 生成网格，并随机放置一些障碍 */
    private initGrid() {
        let self = this;
        let screenWh = self.screenWh;
        let width = screenWh[0];
        let height = screenWh[1];
        let numCols = Math.floor(width / self._cellSize);
        let numRows = Math.floor(height / self._cellSize);
        console.log('numCols: ' + numCols,'numRows: ' + numRows);
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

        // let groundParent = this.node.getChildByName('ground');
        // let len = numCols * numRows;
        // for (let i = 0; i < len; i++)
        // {
        //     let ground = instantiate(this.ground);
        //     groundParent.addChild(ground);
        // }
    }

    private makeBlock() {
        let self = this;
        let blockGraphics = self.graphicsBlock._content;
        blockGraphics.clear();
        // let wallParent = this.node.getChildByName('wall');
        // wallParent.removeAllChildren();
        let bolckCount = Math.floor((self._grid.numCols * self._grid.numRows) / 4);
        for (let i = 0; i < bolckCount; i++) {
            let _x = Math.floor(Math.random() * self._grid.numCols);
            let _y = Math.floor(Math.random() * self._grid.numRows);
            self._grid.setWalkable(_x, _y, false);
            let node = self._grid.getNode(_x, _y);
            blockGraphics.fillColor.fromHEX(self.getColor(node));
            // blockGraphics.rect(_x * self._cellSize, _y * self._cellSize, self._cellSize, self._cellSize);
            blockGraphics.rect(0, 0, self._cellSize, self._cellSize);
            blockGraphics.fill();
            // let wall = instantiate(this.wall);
            // wallParent.addChild(wall);
            // wall.setPosition(new Vec3(_x * self._cellSize, _y * self._cellSize))
        }
    }

    /** 生成一个player角色 */
    private makePlayer() {
        let self = this;
        let radius = 13;//半径
        let graphicsPlayer = self.graphicsPlayer._content;
        graphicsPlayer.clear();
        graphicsPlayer.fillColor.fromHEX('#ff0000');
        graphicsPlayer.circle(0, 0, radius);
        graphicsPlayer.fill();

        let ranDomStaryPos = self._grid.getRanDomStartPos();
        let _x = ranDomStaryPos.x * self._cellSize + self._cellSize / 2;
        let _y = ranDomStaryPos.y * self._cellSize + self._cellSize / 2;
        // graphicsPlayer.node.setPosition(_x, _y + self.view.y);
        self.graphicsPlayer.setPosition(0 + self._cellSize / 2, 0 + self._cellSize / 2);
        console.log('_x: ' + ranDomStaryPos.x, '_y: ' + ranDomStaryPos.y);
    }

    /**
   * 重置
   */
    private onReset() {
        let self = this;
        self.graphicsPath._content.clear();
        self._grid.resetWalkable();
        self.makeBlock();
        self.makePlayer();
    }

    private _tap_grp_container(event: fgui.Event) {
        let self = this;
        // let point = event.getUILocation();
        // console.log('getUILocation: ' + event.getUILocation());
        // console.log('getLocationInView: ' + event.getLocationInView());
        // console.log('getLocation: ' + event.getLocation());
        // console.log('getPreviousLocation: ' + event.getPreviousLocation());
        // console.log('getStartLocation: ' + event.getStartLocation());
        // console.log('getUIStartLocation: ' + event.getUIStartLocation());


        // self.graphicsPath._content.clear();
        // let xPos = Math.floor(point.x / self._cellSize);
        // let yPos = Math.floor(point.y / self._cellSize);
        // let node = self._grid.getNode(xPos, yPos);
        // if (!node) return;
        // self._grid.setEndNode(xPos, yPos);
        // let endNode: Nodes = self._grid.endNode;
        // if (endNode.walkable) {
        //     self.graphicsPath._content.fillColor.fromHEX(self.getColor(endNode));
        //     self.graphicsPath._content.rect(xPos * self._cellSize, yPos * self._cellSize, self._cellSize, self._cellSize);
        //     self.graphicsPath._content.fill();
        // }
        // let playerPos = self.graphicsPlayer.node.position;
        // xPos = Math.floor(playerPos.x / self._cellSize);
        // yPos = Math.floor(playerPos.y / self._cellSize);
        // self._grid.setStartNode(xPos, yPos);
        // self.findPath();
    }

    /** 寻路 */
    private findPath() {
        let self = this;
        let astar = new AStar();
        if (astar.findPath(self._grid)) {
            // self.lbl_cost.string = "本次寻路总耗时: " + astar.costTotTime + "秒";
            self._path = astar.path;
            self._index = 0;
            self._startFrame = true;
        } else {
            // let messageitem = instantiate(self.messageitem);
            // let msgScript = messageitem.getComponent(MessageItem);
            // msgScript.setContent('没找到最佳节点，无路可走!');
            // self.node.parent.addChild(messageitem);
            console.log('没找到最佳节点，无路可走!');
        }
    }

    update(deltaTime: number) {
        let self = this;
        if (!this._startFrame) return;
        let _cellSize = self._cellSize;
        let targetX = self._path[self._index].x * _cellSize + _cellSize / 2;
        let targetY = self._path[self._index].y * _cellSize + _cellSize / 2;

        //把经过的点，涂上黄色
        let passedNode = self._path[self._index];

        self.graphicsPath._content.fillColor.fromHEX('#ffff00');
        self.graphicsPath._content.rect(passedNode.x * _cellSize, passedNode.y * _cellSize, _cellSize, _cellSize);
        self.graphicsPath._content.fill();

        let playerPos = { x: self.graphicsPlayer.x, y: self.graphicsPlayer.y };
        let dx = targetX - playerPos.x;
        let dy = targetY - playerPos.y;
        let dist: Number = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) {
            self._index++;//索引加1，即取一个路径节点
            if (self._index >= self._path.length)//达到最后一个节点时，移除ENTER_FRAME监听
            {
                this._startFrame = false;
            }
        } else {
            self.graphicsPlayer.setPosition(playerPos.x + dx * self._speed, playerPos.y + dy * self._speed);
        }
    }

    /** 返回节点颜色 */
    private getColor(node: Nodes) {
        let self = this;
        if (!node.walkable)
            return '#000000';
        if (node == self._grid.startNode)
            return '#cccccc';
        if (node == self._grid.endNode)
            return '#ff0000';
        return '#ffffff';
    }

    private get screenWh() {
        let self = this;
        return [self.view.width, self.view.height];
    }
}

