class LayoutObj implements IDispose
{
	/**以右侧为基准变化x坐标，ps如果设置了left 则会变化width*/
	right?: number;
	/**以左侧为基准变化x坐标，ps如果设置了right 则会变化width*/
	left?: number;
	/**以顶部为基准变化y坐标，ps如果设置了bottom 则会变化height*/
	top?: number;
	/**以底部为基准变化y坐标，ps如果设置了top 则会变化height*/
	bottom?: number;
	// /**target的相对container的x坐标*/
	// x: number = 0;
	// /**target的相对container的y坐标*/
	// y: number = 0;
	/**需要布局的target*/
	target: egret.DisplayObject;
	/**根据该容器调整布局，默认为target.parent*/
	container?: egret.DisplayObject;

	public dispose(): void
	{
		let self = this;
		self.target = null;
		// self.x = 0;
		// self.y = 0;
		delete self.container;
		delete self.left;
		delete self.right;
		delete self.top;
		delete self.bottom;
	}
}

class SimpleLayout implements IResize
{
	public static readonly Inst: SimpleLayout = new SimpleLayout();

	private _layOutObjMap: {[key: number]: LayoutObj} = {};

	private constructor() 
	{
	}
	
	public onResize(stageW: number, stageH: number): void
	{
		let self = this;
		let layOutObjMap = self._layOutObjMap;
		//第一次布局迭代
		for (let key in layOutObjMap)
		{
			self.iterateLayOut(layOutObjMap[key]);
		}
		//第二次布局迭代，防止存在 后续引用：比如a.container==b.target,但是a先调整布局，b后调整布局，导致a不准确
		for (let key in layOutObjMap)
		{
			self.iterateLayOut(layOutObjMap[key]);
		}
	}

	private iterateLayOut(layOutObj: LayoutObj): void
	{
		let container = layOutObj.container;
		if (container == null)
			container = layOutObj.target.parent;
		if (container == null)
			return;
		let containerPos = container.localToGlobal();
		//如果left、right 都设置了 那么表示改变宽度
		if (layOutObj.left && layOutObj.right)
		{
			layOutObj.target.x = containerPos.x + layOutObj.left;
			layOutObj.target.width = container.width - layOutObj.left - layOutObj.right;
		} else if (layOutObj.left)
		{
			layOutObj.target.x = containerPos.x + layOutObj.left;
		} else if (layOutObj.right)
		{
			layOutObj.target.x = containerPos.x + container.width - (layOutObj.target.width + layOutObj.right);
		}
		//如果top、bottom 都设置了 那么表示改变高度
		if (layOutObj.top && layOutObj.bottom)
		{
			layOutObj.target.y = containerPos.y + layOutObj.top;
			layOutObj.target.height = container.height - layOutObj.top - layOutObj.bottom;
		} else if (layOutObj.top)
		{
			layOutObj.target.y = containerPos.y + layOutObj.top;
		} else if (layOutObj.bottom)
		{
			layOutObj.target.y = containerPos.y + container.height - (layOutObj.target.height + layOutObj.bottom);
		}
	}

	public getLayOut(target: egret.DisplayObject): LayoutObj
	{
		if (target == null)
		{
			return;
		}
		let self = this;
		let layOutObj = self._layOutObjMap[target.hashCode];
		if (layOutObj == null)
		{
			layOutObj = tool.Pool.getObject(LayoutObj);
		}
		return layOutObj;
	}

	public dispose(target: egret.DisplayObject): void
	{
		if (target == null)
		{
			return;
		}
		let self = this;
		let layOutObj = self._layOutObjMap[target.hashCode];
		if (layOutObj)
		{
			layOutObj.dispose();
			tool.Pool.releaseObject(layOutObj);
			delete self._layOutObjMap[target.hashCode];
		}
	}

	public checkHasLayOut(target: egret.DisplayObject): boolean
	{
		return !!this._layOutObjMap[target.hashCode];
	}

	public register(layOutObj: LayoutObj): boolean
	{
		let self = this;
		if (self.checkHasLayOut(layOutObj.target))
		{
			return false;
		}
		self._layOutObjMap[layOutObj.target.hashCode] = layOutObj;
		return true;
	}
}