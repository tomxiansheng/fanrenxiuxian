class SimpleList extends eui.Scroller implements  eui.UIComponent 
{
	
	public dataList:eui.List;

	private _renderHandler: Handler;
	private _isRendered: boolean;
	private _selectHandler: Handler;

	private _selectedIndex: number;
	private _itemRendererSkinName: any;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if (partName == "dataList") 
		{
			this.viewport = this.dataList;
		}
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.allowMultipleSelection = false;
		this.setSingleScroll(false);
		this.dataList.once(egret.Event.RENDER, this.onRender, this);
	}
	private onRender(event?: egret.Event): void
	{
		this._isRendered = true;
		if (this._renderHandler)
		{
			this._renderHandler.execute();
		}
	}
	private onSelect(event?: eui.ItemTapEvent): void
	{
		let dataList = this.dataList;
		let selectHandler = this._selectHandler;
		if (selectHandler)
		{
			if (dataList.allowMultipleSelection)
			{
				selectHandler.execute([dataList.selectedIndices])
			} else 
			{
				selectHandler.execute([dataList.selectedIndex]);	
			}
		}
	}
	/**list 的 egret.Event.RENDER 响应方法*/
	public registerRender(render: Function, thisObj: any, ...args): void
	{
		this.removeRenderHandler();
		let handler = tool.Pool.getObject(Handler);
		handler.add(render, thisObj, args);
		this._renderHandler = handler;
		if (this._isRendered)
		{
			this.onRender();
		}
	}
	/**注册select监听*/
	public registerSelect(select: (index: number|Array<number>, ...args)=>void, thisObj: any, ...args): void
	{
		this.removeSelectHandler();
		let handler = tool.Pool.getObject(Handler);
		handler.add(select, thisObj, args);
		this._selectHandler = handler;
		//添加监听
		if (!this.dataList.hasEventListener(eui.ItemTapEvent.ITEM_TAP))
		{
			this.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
		}
	}
	/** 添加数据 默认使用ArrayCollection*/
	public addData(data: Array<any>|any, isReplace: boolean = false): void 
	{
		let dataList = this.dataList;
		let arrayCollection: eui.ArrayCollection = dataList.dataProvider as eui.ArrayCollection;
		//判断是否替换原有数据
		//data非ArrayCollection
		if (!(data instanceof eui.ArrayCollection))
		{
			if (isReplace && arrayCollection) //如果是，删除原有数据
			{
				arrayCollection.removeAll();
			}
			//dataProvider是null
			if (!arrayCollection)
			{
				arrayCollection = new eui.ArrayCollection();
				dataList.dataProvider = arrayCollection;
			}
			//如果是数组，那么循环添加
			if (data instanceof Array)
			{
				for (let d of data)
				{
					arrayCollection.addItem(d);
				}
			} else 
			{
				arrayCollection.addItem(data);
			}
		} else 
		{
			if (isReplace)//替换原有的dataProvider
			{
				dataList.dataProvider = null;
				dataList.dataProvider = data;
			} else 
			{
				if (!arrayCollection)
				{
					arrayCollection = new eui.ArrayCollection();
					dataList.dataProvider = arrayCollection;
				}
				for (let i = 0; i < data.length; i++)
				{
					arrayCollection.addItem(data.getItemAt(i));
				}
			}
		}
	}
	/**滚动到对应index,显示规则：
	 * 如果视窗只能显示2X2；index=1，显示[[1,2][4,5]];index=2,显示[[1,2][4,5]];index=11,显示[[7,8][10,11]]
	 * list显示2行3列以rows方向增长
	 * [[0,1,2]
	 * 	[3,4,5]
	 *  [6,7,8]
	 *  [9,10,11]]
	 * @param index 滚动到对应index
	 * @param thisOb this的指向
	 * @param caculeFn 如果需要额外计算偏移，则使用该方法；
	 * @param args 额外参数
	*/
	public scrollTo(index: number, thisObj?: any, caculateFn?:(scrollH: number, scrollV: number)=>{scrollH: number, scrollV: number}, ...args): void
	{
		tool.UIUtils.scrollTo(this.dataList, this.height, this.width, index, thisObj, caculateFn, ...args);
	}
	/**
	 * 单向滚动
	 * @param isScrollH 是否是水平方向
	 * @param policy 滚动策略
	*/
	public setSingleScroll(isScrollH: boolean, policy: string = "auto"): void
	{
		if (isScrollH)
		{
			this.scrollPolicyH = policy;
			this.scrollPolicyV = "off";
		} else 
		{
			this.scrollPolicyH = "off";
			this.scrollPolicyV = policy;
		}
	}
	/**是否可以多选*/
	public set allowMultipleSelection(value: boolean)
	{
		if (this.dataList)
			this.dataList.allowMultipleSelection = !!value;
	}
	public get allowMultipleSelection(): boolean
	{
		if (this.dataList)
			return this.dataList.allowMultipleSelection;
		return false;
	}
	/**用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口*/
	public set itemRenderer(value: any)
	{
		if (this.dataList)
			this.dataList.itemRenderer = value;
	}
	/**用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口*/
	public get itemRenderer(): any
	{
		if (this.dataList)
			return this.dataList.itemRenderer;
		return null;
	}
	/**选中list item*/
	public set selectedIndex(value: number)
	{
		if (!this.dataList || this.dataList.selectedIndex == value) 
			return;
		this.dataList.selectedIndex = value;
		this.onSelect();
	}
	/**当前选中*/
	public get selectedIndex(): number
	{
		if (this.dataList)
			return this.dataList.selectedIndex;
		return 0;
	}

	public dispose(): void
	{
		this.removeRenderHandler();
		this.removeSelectHandler();
	}
	private removeRenderHandler(): void
	{
		if (this._renderHandler)
		{
			this._renderHandler.dispose();
			tool.Pool.releaseObject(this._renderHandler);
			this._renderHandler = null;
		}
	}
	private removeSelectHandler(): void
	{
		if (this._selectHandler)
		{
			this._selectHandler.dispose();
			tool.Pool.releaseObject(this._selectHandler);
			this._selectHandler = null;
		}
	}
}

class SimpleItemRenderer extends eui.ItemRenderer
{
	public set selected(value: boolean)
	{
		egret.superSetter(eui.ItemRenderer, this, "selected");
		if (this["select"])
		{
			this["select"].visible = value;
		}
	}
}