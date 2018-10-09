module tool
{
    export class DrawUtils
    {
        /**cd绘制函数
         * @param target 需要绘制cd的对象，必须在显示列表里
         * @param offAngle 每次变化的角度
         * @param offTime 计时器时间（毫秒），如果<=0,只会运行一次。
         * @param radius 圆弧半径
         * @param isReverse 是否反向，360-curAngle
         * @param startAngle cd起始角度
         * @param thisObj this的指向控制
         * @param upFn 计时器运行时 调用的update方法：返回值boolean，返回true继续运行计时器，否则反之
         * @param ...args 需要传入upFn额外的参数
         * @return 返回clear函数，可以手动调用结束掉
        */
        public static drawProgress(
            target:egret.DisplayObject, 
            offAngle: number, 
            offTime: number, 
            radius: number, 
            isReverse: boolean = false,
            startAngle: number = 0, 
            thisObj?: any, upFn?: (curAngle: number, curTime: number, ...args)=>boolean, ...args
            ): ()=>void
        {
            if (!target || !target.parent)
                return;

            let shape = target.parent.getChildByName("__drawProgress_shapeMask__") as egret.Shape;
            if (!shape)
            {
                shape = tool.Pool.getObject(egret.Shape);
                shape.x = target.x + target.width/2;
                shape.y = target.y + target.height/2;
                shape.name = "__drawProgress_shapeMask__";
                target.parent.addChild(shape);
                target.mask = shape;
            }
            let curAngle = startAngle + offAngle;

            let startAngle1 = startAngle*Math.PI/180;
            let clear = ()=>
            {
                if (timeId > 0)
                {
                    egret.clearInterval(timeId);
                    timeId = 0;
                }
                if (shape && shape.name == "__drawProgress_shapeMask__")//自己new shape 自己管理
                {
                    if (shape.parent)
                        shape.parent.removeChild(shape);

                    shape.name = null;
                    tool.Pool.releaseObject(shape);
                }
            }
            let update = ()=>
            {
                shape.graphics.clear();
                shape.graphics.beginFill(0x00ffff, 1);
                shape.graphics.lineTo(0, radius);
                if (isReverse)
                {
                    let tmp = (startAngle+360)%360;
                    tmp = tmp == 0? 360 : tmp;
                    shape.graphics.drawArc(0, 0, radius, curAngle*Math.PI/180, tmp*Math.PI/180);
                } else 
                {
                    shape.graphics.drawArc(0, 0, radius, startAngle1, curAngle*Math.PI/180);
                }

                shape.graphics.lineTo(0, 0);
                shape.graphics.endFill();

                let isRunning: boolean = true;
                if (upFn)
                {
                    if (args && args.length > 0)
                    {
                        isRunning = upFn.apply(thisObj, [curAngle, time].concat(args));
                    } else 
                    {
                        isRunning = upFn.apply(thisObj, [curAngle, time])
                    }
                }
                curAngle = (curAngle + offAngle) % 360;
                time += offTime;
                if (!isRunning)
                {
                   clear();
                }
            }
            let timeId = 0;
            let time = offTime;
            if (offTime > 0)
            {
                timeId = egret.setInterval(update, thisObj, offTime);
            } else 
            {
                update();
            }
            return clear;
        }
        
        public static doBezierCurveMove(
            target: egret.DisplayObject, 
            p0: egret.Point, p1: egret.Point, p2: egret.Point, 
            delay: number = 1000, 
            loop: boolean = false, 
            thisObj?: any, updateFn?: ()=>boolean, ...args): ()=>void
        {
            let factor = (value: number)=>
            {
                target.x = (1-value) * (1-value) * p0.x + 2*value*(1-value)*p1.x + value*value*p2.x;
                target.y = (1-value) * (1-value) * p0.y + 2*value*(1-value)*p1.y + value*value*p2.y;
            }
            let update = ()=>
            {
                let isRunning = true;
                if (updateFn)
                {
                    if (args)
                        isRunning = updateFn.apply(thisObj, [])
                }
            }
            let clear = ()=>
            {

            }
            let arc = tool.Pool.getObject
            egret.Tween.get(target, {loop: loop, onChange: update}).to(null, delay);

            return clear;
        }

                /**设置按钮点击效果
         * @param target 实现按钮效果的target
         * @param thisObj this的指向控制
         * @param touchFn 调用的函数
         * @return 返回clear
        */
        public static setBtnModel1(target: egret.DisplayObject, thisObj?: any, touchFn?: (model: string, ...args)=>void, ...args): ()=>void
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
        /**设置按钮效果，短点击、长点击
         * @param target 实现按钮效果的target
         * @param thisObj this的指向控制
         * @param shortTouch 使用tool.Pool.getObject(Handler)对象池生成， 短点击
         * @param longTouch <strong>会传入curtime，当前运行了多久。<strong>使用tool.Pool.getObject(Handler)对象池生成，长点击
         * @param startTick 什么时候开始执行longtouch
         * @param tick 执行longtouch的时间间隔
         * @return 返回clear函数，不会清理shortTouch，longTouch
        */
        public static setBtnModel2(target: egret.DisplayObject, thisObj?: any, shortTouch?: Handler, longTouch?: Handler, startTick: number = 1000, tick: number = 500): ()=>void
        {
            if (!target || !target.stage)
                return;
            let onTouchBegin = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, thisObj);
                
                clearTime();//默认清理掉 计时器
                if (longTouch)//如果有注册长点击，才会触发
                {
                    timeId = egret.setTimeout(timeOut, thisObj, startTick);
                }
            }
            let timeOut = ()=>
            {
                clearTime();
                timeUp();
                timeId = egret.setInterval(timeUp, thisObj, tick);
            }
            let timeUp = ()=>
            {
                longTouch.execute([tick]);
            }
            let onTouchCancle = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, thisObj);

                clearTime();
                if (shortTouch)
                    shortTouch.execute();
            }
            let onTouchEnd = (evt: egret.TouchEvent)=>
            {
                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, thisObj);

                clearTime();
                if (shortTouch)
                    shortTouch.execute();
            }
            let clearTime = ()=>
            {
                if (timeId > 0)
                {
                    egret.clearTimeout(timeId);
                    egret.clearInterval(timeId);
                    timeId = 0;
                }
            }
            let clear = ()=>
            {
                clearTime();
                target.scaleX = cacheScaleX;
                target.scaleY = cacheScaleY;

                target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, thisObj);
                let stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, thisObj);
            }

            let timeId: number;

            let cacheScaleY = target.scaleY;
            let cacheScaleX = target.scaleX;

			let dx = target.anchorOffsetX - target.width/2;
			let dy = target.anchorOffsetY - target.height;
			target.x = target.x - dx;
			target.y = target.y - dy;
            target.anchorOffsetX = target.width/2;
		    target.anchorOffsetY = target.height;

            clear();
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
					
					indexRow = Math.ceil(index / dataList.layout.columnCount);
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
					
					indexColumn = Math.ceil(index / dataList.layout.rowCount);
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
    /**做贝塞尔缺陷运动
     * @param target 需要运动的target
     * @param p0 起始点
     * @param p1 拐点
     * @param p2 终止点
     * @param delay 移动时间 毫秒级
     * @param loop 是否循环
    */
    export class ArcMotion implements IDispose
    {
        private _target:    egret.DisplayObject;
        private _p0:        egret.Point;
        private _p1:        egret.Point;
        private _p2:        egret.Point;
        private _delay:     number;
        private _loop:      boolean;

        public constructor(target: egret.DisplayObject, p0: egret.Point, p1: egret.Point, p2: egret.Point, delay: number = 1000, loop: boolean = false)
        {
            this._target    = target;
            this._p0        = p0;
            this._p1        = p1;
            this._p2        = p2;
            this._delay     = delay;
            this._loop      = loop;
        }

        public play(): void
        {
            this.factor = 0;
            egret.Tween.get(this, {loop: this._loop}).to({factor: 1}, this._delay);
        }

        public stop(): void
        {
            egret.Tween.removeTweens(this);
            this.dispose();
        }

        //起始点P0 = 100，中间点P1 = 300, 终点P2 = 500
        public set factor(value: number) 
        {
            let self = this;
            self._target.x = (1 - value) * (1 - value) * self._p0.x + 2 * value * (1 - value) * self._p1.x + value * value * self._p2.x;
            self._target.y = (1 - value) * (1 - value) * self._p0.y + 2 * value * (1 - value) * self._p1.y + value * value * self._p2.y;
        }

        public dispose(): void
        {
            this._target = null;
            this._p0 = null;
            this._p1 = null;
            this._p2 = null;
        }
    }
}