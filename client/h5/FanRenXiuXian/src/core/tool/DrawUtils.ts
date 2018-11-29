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
    }
}