//=====红点组件================================================================
interface RedPointData
{
    key: string;
    display: egret.DisplayObject;
    redPoint?: eui.Image;
    offX?: number;
    offY?: number;
}
class RedPointCmp extends UICmp
{
    private _redPointMap: {[key: string]: RedPointData};
    
    public bind(skin: any): void
    {
        super.bind(skin);

        let self = this;

        let redPointCfg: Array<RedPointData> = skin.cfg_redPointCmp;
        if (redPointCfg)
        {
            for (let i = 0; i < redPointCfg.length; i++)
            {
                self.registerRedPoint(redPointCfg[i]);
            }
        }
    }
    public update(cmd: string, data?: any): void
    {
        let self = this;
        switch(cmd)
        {
            case "show":
                let redPointKeys = data? data.redPointKeys : null;
                //红点显示
                self.updateRedPoint(redPointKeys);
                break;
            case "hide":
                 //红点移除
                for (let key in self._redPointMap)
                {
                    let obj = self._redPointMap[key];
                    if (obj.redPoint)
                    {
                        if (obj.redPoint.parent)
                            obj.redPoint.parent.removeChild(obj.redPoint);
                        tool.Pool.releaseObject(obj.redPoint);
                        delete obj.redPoint;
                    }
                }
                break;
            case "redPoint":
                self.updateRedPoint(data);
                break;
            case "dispose":
                self.dispose();
                break;
        }
    }
    /**注册红点
    */
    public registerRedPoint(data: RedPointData): void
    {
        let self = this;
        if (!self._redPointMap)
            self._redPointMap = {};
        self._redPointMap[data.key] = data;
    }
    /**更新红点
    */
    public updateRedPoint(keys: string|string[], isShow: boolean = true): void
    {
        if (keys == null || keys == undefined)
            return;

        let self = this;
        
        if (typeof keys == "string")
        {
            self.showRedPoint(keys, isShow);
        } else
        {
            for (let key of keys)
            {
                self.showRedPoint(key, isShow);
            }
        }
    }
    /**红点显示策略*/
    private showRedPoint(key: string, isShow: boolean): void
    {
        //优化策略:红点重用
        //1、当一个面板未关闭时，红点不会被移除，
        //	A.如果有新红点先遍历是否有不用的红点 有则显示并且调整坐标, 无则从对象池获取
        //2、当面板关闭时，移除所有红点
        let viewHitMap = this._redPointMap;
        if (!viewHitMap)
            return;
        let obj = viewHitMap[key];
        if (!obj || !obj.display || !obj.display.parent || !obj.display.visible)
            return;
        if (isShow)
        {
            let redPoint: eui.Image;
            for (let key in viewHitMap)
            {
                let tmp = viewHitMap[key];
                if (!!tmp && !!tmp.redPoint && !tmp.redPoint.visible)
                {
                    redPoint = tmp.redPoint;
                    delete tmp.redPoint;
                    break;
                }
            }
            if (!redPoint)
            {
                redPoint = tool.Pool.getObject(eui.Image);
                redPoint.source = "redPoint_png";
                redPoint.touchEnabled = false;
                obj.display.parent.addChild(redPoint);
            }
            redPoint.visible = true;
            redPoint.x = obj.display.x + obj.offX;
            redPoint.y = obj.display.y + obj.offY;
        } else
        {
            if (obj.redPoint)
                obj.redPoint.visible = false;
        }
    }

    public dispose(): void
    {
        let self = this;
        //移除红点
        if (self._redPointMap)
        {
            for (let key in self._redPointMap)
            {
                let obj = self._redPointMap[key];
                if (obj.redPoint)
                {
                    if (obj.redPoint.parent)
                        obj.redPoint.parent.removeChild(obj.redPoint);
                    tool.Pool.releaseObject(obj.redPoint);
                    delete obj.redPoint;
                }
            }
        }
    }
}
//=====红点组件================================================================