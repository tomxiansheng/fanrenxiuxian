module tool 
{
	export class UIUtils 
	{
		        /**设置按钮点击效果
         * @param target 实现按钮效果的target
         * @param thisObj this的指向控制
         * @param touchFn 调用的函数
         * @return 返回clear
        */
        public static setBtnModel(target: egret.DisplayObject, thisObj?: any, touchFn?: (model: string, ...args)=>void, ...args): ()=>void
        {
            if (!target || !target.stage)
                return;
            let update = (model: string)=>
            {
                if (touchFn)
                {
                    if (args)
                        touchFn.apply(thisObj, [model].concat(args));
                    else 
                        touchFn.apply(thisObj, [model])
                }
            }
            let onTouchBegin = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);

                target.scaleY = 0.97*cacheScaleY;
                target.scaleX = 0.99*cacheScaleX;
                
                update("down");
            }
            let onTouchCancle = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);

                target.scaleY = cacheScaleY;
                target.scaleX = cacheScaleX;
                
                update("up");
            }
            let onStageTouchEnd = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj); 

                target.scaleY = cacheScaleY;
                target.scaleX = cacheScaleX;
                
                update("up");
            }
            let clear = ()=>
            {
                target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, thisObj);

                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj); 

                target.scaleX = cacheScaleX;
                target.scaleY = cacheScaleY;
            }

            let cacheScaleY = target.scaleY;
            let cacheScaleX = target.scaleX;
            clear();

			let dx = target.anchorOffsetX - target.width/2;
			let dy = target.anchorOffsetY - target.height;
			target.x = target.x - dx;
			target.y = target.y - dy;
            target.anchorOffsetX = target.width/2;
		    target.anchorOffsetY = target.height;

            target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, thisObj);
            return clear;
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
		public static scrollTo(dataList: eui.List, height: number, width: number, index: number, thisObj?: any, caculateFn?:(scrollH: number, scrollV: number)=>{scrollH: number, scrollV: number}, ...args): void
		{
			if (!dataList)
				return;
			if (!dataList.dataProvider || index >= dataList.dataProvider.length)
				return;
			
			let scrollH: number = 0;
			let scrollV: number = 0;
			let itemWidth: number;
			let itemHeight: number;
			let tmp: number;
			if (dataList.layout instanceof eui.VerticalLayout)
			{
				itemHeight = dataList.layout.$typicalHeight + dataList.layout.gap;
				tmp = (dataList.dataProvider.length-1 - index)*itemHeight;
				if (tmp > height)
				{//可以在最上显示
					scrollV = index*itemHeight;
				} else
				{
					scrollV = dataList.dataProvider.length*itemHeight-height;
					scrollV = scrollV < 0? 0 : scrollV;
				}
			} else if (dataList.layout instanceof eui.HorizontalLayout)
			{
				itemWidth = dataList.layout.$typicalWidth + dataList.layout.gap;
				tmp = (dataList.dataProvider.length-1 - index)*itemWidth;
				if (tmp > width)
				{//可以在最左显示
					scrollH = index*itemWidth;
				} else
				{
					scrollH = dataList.dataProvider.length*itemWidth-width;
					scrollH = scrollH < 0? 0 : scrollH;
				}
			} else if (dataList.layout instanceof eui.TileLayout)
			{
				itemHeight = dataList.layout.$typicalHeight + dataList.layout.verticalGap;
				itemWidth = dataList.layout.$typicalWidth + dataList.layout.horizontalGap;
				let columnCount: number = dataList.layout.columnCount;
				let rowCount: number = dataList.layout.rowCount;

				let indexColumn: number;
				let indexRow: number;
				if (dataList.layout.orientation == "rows")
				{
					indexColumn = index % dataList.layout.columnCount;

					if ((dataList.layout.columnCount - indexColumn)*itemWidth > width)
					{//index是在最左显示
						scrollH = indexColumn*itemWidth;
					} else 
					{
						scrollH = dataList.layout.columnCount*itemWidth-width;
						scrollH = scrollH < 0? 0 : scrollH;
					}
					
					indexRow = Math.floor(index / dataList.layout.columnCount);
					if (indexColumn == 0)
						indexRow += 1;
		
					if ((dataList.layout.rowCount - indexRow+1)*itemHeight >= height)
					{//index是在最上显示
						scrollV = (indexRow-1)*itemHeight;
					} else 
					{
						scrollV = dataList.layout.rowCount*itemHeight-height;
						scrollV = scrollV < 0? 0 : scrollV;
					}
				} else if (dataList.layout.orientation == "columns")
				{
					indexRow = index % dataList.layout.rowCount;

					if ((dataList.layout.rowCount - indexRow)*itemHeight > height)
					{//index是在最上显示
						scrollV = indexRow*itemHeight;
					} else 
					{
						scrollV = dataList.layout.rowCount*itemHeight-height;
						scrollV = scrollV < 0? 0 : scrollV;
					}
					
					indexColumn = Math.floor(index / dataList.layout.rowCount);
					if (indexRow == 0)
						indexColumn += 1;
		
					if ((dataList.layout.columnCount - indexColumn + 1)*itemWidth >= width)
					{//index是在最左显示
						scrollH = (indexColumn-1)*itemWidth;
					} else 
					{
						scrollH = dataList.layout.columnCount*itemWidth-width;
						scrollH = scrollH < 0? 0 : scrollH;
					}
				}
			} else 
			{
				//???什么鬼
			}
			if (caculateFn)
			{
				let result;
				if (args)
					result = caculateFn.apply(thisObj, [scrollH, scrollV].concat(args));
				else
					result = caculateFn.apply(thisObj, [scrollH, scrollV]);
				dataList.scrollH = result.scrollH;
				dataList.scrollV = result.scrollV;
			} else 
			{
				dataList.scrollH = scrollH;
				dataList.scrollV = scrollV;
			}
		}
	}
}