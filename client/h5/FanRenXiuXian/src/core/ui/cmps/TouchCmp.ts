class TouchCache implements IDispose
{
    public static SHORT: string = "short";
    public static LONG: string = "long";

    private _target: egret.DisplayObject;
    private _isTouch: boolean;
    private _isAddEvent: boolean;

    public short: Handler;
    public long: Handler;

    private _scaleY: number;
    private _scaleX: number;

    public addEvt(onTBegin: Function, thisObj: any): void
    {
        let self = this;
        if (!self._isAddEvent)
        {
            self._target.addEventListener(TBegin, onTBegin, thisObj);
        }
        self._isAddEvent = true;
    }

    public removeEvt(onTBegin: Function, thisObj: any): void
    {
        let self = this;
        if (self._isAddEvent)
        {
            self._target.removeEventListener(TBegin, onTBegin, thisObj);
        }
        self._isAddEvent = false;
    }

    public get target(): egret.DisplayObject
    {
        return this._target;
    }

    public set target(value: egret.DisplayObject)
    {
        if (this._target == value)//相同不做添加
            return;

        this._target = value;

        if (!value)//为空时 不做以下操作
            return;
        //暂存缩放，防止该display之前就有缩放
        this._scaleX = value.scaleX;
        this._scaleY = value.scaleY;
        //重置注册点
        let dx = value.anchorOffsetX - value.width/2;
        let dy = value.anchorOffsetY - value.height;
        value.x = value.x - dx;
        value.y = value.y - dy;
        value.anchorOffsetX = value.width/2;
        value.anchorOffsetY = value.height;

        this.isTouch = false;
    }

    public get isTouch(): boolean
    {
        return this._isTouch;
    }

    public set isTouch(value: boolean)
    {
        let self = this;
        self._isTouch = value;

        if (!self.target)
            return;

        if (value)//缩放目标
        {
            self.target.scaleY = 0.97*self._scaleY;
            self.target.scaleX = 0.99*self._scaleX;
        } else 
        {
            self.target.scaleY = self._scaleY;
            self.target.scaleX = self._scaleX;
        }
    }
    /**移除handler : SHORT | LONG*/
    public removeHandler(property: string): void
    {
        let handler = this[property] as Handler;
        if (!handler)
            return;
        handler.dispose();
        tool.Pool.releaseObject(handler);
        this[property] = null;	
    }

    public dispose(): void
    {
        let self = this;
        self.target = null;
        self.isTouch = false;
        self.removeHandler(TouchCache.SHORT);
        self.removeHandler(TouchCache.LONG);
    }
}

class STouchCmp extends UICmp
{
    /**点击暂存*/
    protected touchHandlerMap: {[key: number]: TouchCache};

    public bind(skin: any): void
    {
        super.bind(skin);
        this.touchHandlerMap = skin.cfg_touchCmp;
    }

    public update(cmd: string, data?: any): void
    {
        let self = this;
        switch(cmd)
        {
            case "show":
                for(let key in self.touchHandlerMap)
                {
                    self.touchHandlerMap[key].target.addEventListener(TBegin, self.onTBegin, self.skin);
                }
                break;
            case "close":
                //移除点击
                for(let key in self.touchHandlerMap)
                {
                    self.touchHandlerMap[key].target.removeEventListener(TBegin, self.onTBegin, self.skin);
                }
                break;
            case "dispose":
                self.dispose();
                break;
            case TEnd:
                self.onTEnd();
                break;
            case TCancel:
                self.onTEnd();
                break;
        }
    }

    /**开始响应点击*/
    protected onTBegin(evt: egret.TouchEvent): void
    {
        let obj = this.touchHandlerMap[evt.currentTarget.hashCode];
        obj.isTouch = true;
    }
    /**点击结束*/
    protected onTEnd(): void
    {
        let self = this;
        for (let key in self.touchHandlerMap)
        {
            self.touchHandlerMap[key].isTouch = false;
        }
    }
    /**添加点击*/
    public add(target: egret.DisplayObject, touchFn: (...args)=>void, ...args): void
    {
        this.add1(TouchCache.SHORT, target, touchFn, args);
    }

    protected add1(key: string, target: egret.DisplayObject, touchFn: (...args)=>void, args: any[]): void
    {
        let self = this;
        //设置点击
        let handler = tool.Pool.getObject(Handler);
        handler.add(touchFn, self.skin, args);
        let touchHandleMap = self.touchHandlerMap;

        if (touchHandleMap[target.hashCode])//如果有
        {
            touchHandleMap[target.hashCode][key] = handler;
        } else
        {
            let touchCache = tool.Pool.getObject(TouchCache);
            touchCache.target = target;
            touchCache[key] = handler;
            touchHandleMap[target.hashCode] = touchCache;
        }
    }
    /**移除点击*/
    public remove(target: egret.DisplayObject): void
    {
        this.remove1(TouchCache.SHORT, target);
    }

    protected remove1(key: string, target: egret.DisplayObject): void
    {
        let self = this;
        if (!self.touchHandlerMap || !self.touchHandlerMap[target.hashCode])
            return;

        let obj = self.touchHandlerMap[target.hashCode];
        obj.removeHandler(key);
        
        if (!obj.short && !obj.long)
        {
            target.removeEventListener(TBegin, self.onTBegin, self);
            obj.dispose();
            tool.Pool.releaseObject(obj);
            delete self.touchHandlerMap[target.hashCode];
        }
    }

    public dispose(): void
    {
        let self = this;
        //移除点击事件
        if (self.touchHandlerMap)
        {
            for (let key in self.touchHandlerMap)
            {
                let obj = self.touchHandlerMap[key];
                obj.dispose();
                tool.Pool.releaseObject(obj);
                delete self.touchHandlerMap[key];
            }
        }
    }
}
/**长点击*/
class LTouchCmp extends STouchCmp
{
    /**开启长点击*/
    public static START_LONGTOUCH: number = 1000;
    /**间隔多少调用一次点击事件*/
    public static SPACE_LONGTOUCH: number = 500;
    /**点击暂存*/
    private _touchHandlerMap: {[key: number]: TouchCache};
    /**多少毫秒之后触发 ---> START_LONGTOUCH*/
    private _touchStartTimeId: number;
    /**触发长点击 ---> SPACE_LONGTOUCH*/
    private _touchTimeId: number;

    public bind(skin: any): void
    {
        super.bind(skin);
        this.touchHandlerMap = skin.touchMap;
    }

    /**开始响应点击*/
    protected onTBegin(evt: egret.TouchEvent): void
    {
        let self = this;

        let obj = self.touchHandlerMap[evt.currentTarget.hashCode];
        obj.isTouch = true;
        
        self.clearStartTimeId();
        self.clearTimeId();
        if (obj.long)//有长点击才会触发
        {
            self._touchStartTimeId = egret.setTimeout(self.startTimeId, this, LTouchCmp.START_LONGTOUCH, obj);
        }
    }
    /**点击结束*/
    protected onTEnd(): void
    {
        let self = this;
        self.clearStartTimeId();
        self.clearTimeId();
        for (let key in self.touchHandlerMap)
        {
            let obj = self.touchHandlerMap[key];
            obj.isTouch = false;
        }
    }
    /**添加点击*/
    public add(target: egret.DisplayObject, touchFn: (...args)=>void, ...args): void
    {
        this.add1(TouchCache.LONG, target, touchFn, args);
    }
    /**移除点击*/
    public remove(target: egret.DisplayObject): void
    {
        this.remove1(TouchCache.LONG, target);
    }
    /**开启长点击 tick*/
    private startTimeId(obj: TouchCache): void
    {
        let self = this;
        self.clearStartTimeId();
        self._touchTimeId = egret.setInterval(self.onTouchTick, this, LTouchCmp.SPACE_LONGTOUCH, obj);
    }
    /**触发长点击 ---> SPACE_LONGTOUCH*/
    private onTouchTick(obj: TouchCache): void
    {
        obj.long.execute([LTouchCmp.SPACE_LONGTOUCH]);
    }
    /**多少毫秒之后触发 ---> _touchStartTimeId + START_LONGTOUCH*/
    private clearStartTimeId(): void
    {
        if (this._touchStartTimeId > 0)
        {
            egret.clearTimeout(this._touchStartTimeId);
            this._touchStartTimeId = 0;
        }
    }
    /**触发长点击 ---> _touchTimeId + SPACE_LONGTOUCH*/
    private clearTimeId(): void
    {
        if (this._touchTimeId > 0)
        {
            egret.clearInterval(this._touchTimeId);
            this._touchTimeId = 0;
        }
    }

    public dispose(): void
    {
        let self = this;
        super.dispose();
        //清除计时器
        self.clearStartTimeId();
        self.clearTimeId();
    }
}