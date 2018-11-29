interface IAstarMap
{
	map: {x: number, y: number}[][];
	surroundpoints: {x: number, y: number}[];
	/**计算 G
	 * let x2: number = (point.x - parent.x) * (point.x - parent.x);
	 * let y2: number = (point.y - parent.y) * (point.y - parent.y);
	 * return Math.sqrt(x2 + y2);
	*/
	caculateG(src: {x: number, y: number}): number;
	/**启发式算法
	 * 1、曼哈顿距离
	 * A、四方向  考虑你的代价函数并找到从一个位置移动到邻近位置的最小代价D
	 * 	h = D*Math.abs(goal.x - src.x) + Math.abs(goal.y - src.y);
	 * B、八方向 
	 *  斜角曼哈顿距离
	 *  h_diagoal = Math.min(Math.abs(goal.x - src.x), Math.abs(goal.y - src.y));
	 *  横竖曼哈顿距离
	 * 	h_straight = Math.abs(goal.x - src.x) + Math.abs(goal.y - src.y);
	 *  h = D1*h_diagoal + D2*h_straight;
	 * 2、欧几里得距离 (性能较差)
	 * A、欧几里得距离
	 * 	h = D*Math.sqrt((src.x - goal.x)*(src.x - goal.x) + (src.y - goal.y)*(src.y-goal.y));
	 * B、平方后的欧几里得距离 (不建议使用，会放大差距)
	 *  h = D*((src.x - goal.x)*(src.x - goal.x) + (src.y - goal.y)*(src.y-goal.y));
	 * 3、Breaking ties 减少节点搜索
	 * A、趋近 初始点与目标点的连线 P表示步数期望，最多1000步那么P=1000
	 *  srcDx = src.x - goal.x;
	 * 	srcDy = src.y - goal.y;
	 *  startDx = start.x - goal.x;
	 *  startDy = start.y - goal.y;
	 *  cross = Math.abs(srcDx*startDy - startDx*srcDy);
	 *  h = h + cross+(1/P)
	*/
	caculateH(src: {x: number, y: number}, goal: {x: number, y: number}): number;

	getAstarNode(p: {x: number, y: number}): AStarNode;
	/**判断点是否可移动
	*/
	checkPointCanMove(p: {x: number, y: number}): boolean;
}

class AStarNode implements IDispose
{
	public parent: AStarNode;
	public x: number;
	public y: number;
	public H: number;
	public G: number;
	public F: number;
	/**性能优化：减少closeList多余数组*/
	public isClosed: boolean;
	/**性能优化：减少indexOf的性能消耗*/
	public index: number;

	public updateParent(parent: AStarNode, g: number): void
	{
		let self = this;
		self.parent = parent;
		self.G = g;
		self.F = g + self.H;
	}

	public dispose(): void
	{
		let self = this;
		self.parent = null;
		self.isClosed = false;
		self.G = 0;
		self.H = 0;
		self.F = 0;
		self.x = 0;
		self.y = 0;
	}
}

class AStar 
{
	private static DEFAULT_OFF: number = 1000;
	private _map: IAstarMap;
	private _cacheAStarNodes: {[key: number]: AStarNode} = {};

	public bindMap(map: IAstarMap): void
	{
		let self = this;
		self._map = map;
	}
	/**二元堆插入*/
	public insterList(list: AStarNode[], target: AStarNode): AStarNode[]
	{
		list.push(target);
		target.index = list.length -1;
		let index = list.length;
		while (index == 0)
		{
			let rootIndex = Math.floor(index / 2) -1;
			if (list[rootIndex].F > list[index].F)
			{
				let tmp = list[rootIndex];

				list[rootIndex] = list[index];
				list[rootIndex].index = rootIndex;

				list[index] = tmp;
				list[index].index = index;

				index = rootIndex;
			} else
			{
				break;
			}
		}
		return list;
	}
	/**二元堆删除*/
	public deleteList(list: AStarNode[], index: number): AStarNode[]
	{
		list[index] = list[list.length -1];
		list.pop();
		let child;
		while ((child = index*2+1) < list.length)
		{
			if (list[index].F > list[child].F)
			{
				let tmp = list[index];
				list[child] = tmp;
				list[index] = list[child];
				index = child;
			} else
			{
				break;
			}
		}
		return list;
	}

	public findPath(start: {x: number, y: number}, end: {x: number, y: number}): AStarNode[]
	{
		let self = this;
		let startNode = tool.Pool.getObject(AStarNode);
		startNode.x = start.x;
		startNode.y = start.y;
		let endNode = tool.Pool.getObject(AStarNode);
		endNode.x = end.x;
		endNode.y = end.y;
		return self.findPath1(startNode, endNode);
	}
	
	public findPath1(start: AStarNode, end: AStarNode): AStarNode[]
	{
		let self = this;
		//回收
		for (let key in self._cacheAStarNodes)
		{
			let tmp = self._cacheAStarNodes[key];
			tmp.dispose();
			tool.Pool.releaseObject(tmp);
		}

		//二元堆
		let openList: AStarNode[] = [];
		openList = self.insterList(openList, start);

		while(openList.length > 0)
		{
			let point: AStarNode = self.findMinFOfPoint(openList);

			self.deleteList(openList, point.index);

			point.isClosed = true;
			self._cacheAStarNodes[(point.x*AStar.DEFAULT_OFF + point.y)] = point;

			let surroundPoints: AStarNode[] = self.getSurroundPoints(point);
			
			for (let surroundPoint of surroundPoints)
			{
				if (openList.indexOf(surroundPoint) > -1)
				{
					let nowG: number = self.caculateG(surroundPoint, surroundPoint.parent);
					if (nowG < surroundPoint.G)
					{
						surroundPoint.updateParent(point, nowG);
					}	
				} else
				{
					surroundPoint.parent = point;
					surroundPoint = self.caculateF(surroundPoint, end);
					openList = self.insterList(openList, surroundPoint);
				}
			}
			if (openList.indexOf(end) > -1)
			{
				break;
			}
		}
		let result: AStarNode[] = [];
		let tmp = end;
		while(!tmp && tmp.parent != start)
		{
			result.push(tmp);
			tmp = tmp.parent;
		}
		return result.reverse();
	}

	public findMinFOfPoint(openList: AStarNode[]): AStarNode
	{
		//使用二元堆 最小F就是index=0
		return openList[0];
		// let f: number = Number.MAX_VALUE;
		// let temp: AStarNode;
		// for (let p of openList)
		// {
		// 	if (p.F < f)
		// 	{
		// 		temp = p;
		// 		f = p.F;
		// 	}
		// }
		// return temp;
	}

	public getSurroundPoints(pos: AStarNode): AStarNode[]
	{
		let self = this;
		let result: AStarNode[] = [];
		for (let surroundPoint of self._map.surroundpoints)
		{
			let x = surroundPoint.x + pos.x;
			let y = surroundPoint.y + pos.y;

			let astar: AStarNode = self._cacheAStarNodes[(x*AStar.DEFAULT_OFF + y)];
			if (!astar)
				astar = tool.Pool.getObject(AStarNode);
			astar.x = x;
			astar.y = y;
			if (!astar.isClosed && self._map.checkPointCanMove(astar))//不在关闭列表中并且可行走
				result.push(astar);
		}
		return result;
	}

	public caculateG(point: AStarNode, parent: AStarNode): number
	{
		return this._map.caculateG(point) + parent.G;
	}

	public caculateF(point: AStarNode, end: AStarNode): AStarNode
	{
		let self = this;
		let h: number = self._map.caculateH(point, end);
		let g: number;
		if (!point.parent)
		{
			g = 0;
		} else 
		{
			g = self.caculateG(point, point.parent);
		}
		let f: number = g + h;
		point.F = f;
		point.G = g;
		point.H = h;
		return point;
	}
}