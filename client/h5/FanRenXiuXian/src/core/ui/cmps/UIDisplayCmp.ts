//menu的特效显示
class MenuDisplayCmp extends UICmp
{
    public preX: number;
    public preY: number;
    private _handler: Handler;

    private _tween: egret.Tween;

    public bind(skin: CmpsUI): void
    {
        let self = this;
        super.bind(skin);

        skin.addEventListener(TBegin, self.onTBegin, self);
    }

    private onTBegin(evt: egret.TouchEvent): void
    {
        evt.stopImmediatePropagation();
        let self = this;
        if (!!self._tween)
        {
            self._tween.pause();
            self.skin.addEventListener(TEnd, self.onTBegin, self);
        }
    }

    private onTEnd(evt: egret.TouchEvent): void
    {
        let self = this;
        self.skin.removeEventListener(TEnd, self.onTEnd, self);
        if (!!self._tween)
        {
            self._tween.play();
        }
    }
    /**运行
     * 0=up
     * 1=down
     * 2=left
     * 3=right
    */
    public run(direction: number, cbkFn?: (...args)=>void, ...args): void
    {
        let self = this;

        self.preX = self.skin.x;
        self.preY = self.skin.y;
        
        if (!!cbkFn)
        {   
            self._handler = tool.Pool.getObject(Handler);
            self._handler.add(cbkFn, self.skin, args);
        }
        let toX: number = self.preX;
        let toY: number = self.preY;
        switch(direction)
        {
            case 0://up
                toY -= self.skin.height;
                break;
            case 1://down
                toY += self.skin.height;
                break;
            case 2://left
                toX -= self.skin.width;
                break;
            case 3://right
                toX += self.skin.width;
                break;
        }
        self.launchTween(toX, toY);
    }

    private launchTween(toX: number, toY: number): void
    {
        let self = this;
        self.disposeTween();
        self._tween = egret.Tween.get(self.skin).to({x: toX, y: toY}, 300, egret.Ease.sineIn).call(
            ()=>{
                if (self._handler)
                    self._handler.execute();
            });
    }

    public cancel(): void
    {
        let self = this;
        self.launchTween(self.preX, self.preY);
    }

    private disposeTween(): void
    {
        let self = this;
        if (!!self._tween)
        {
            egret.Tween.removeTweens(self.skin);
            self._tween = null;
        }
    }

    public dispose(): void
    {
        super.dispose();
        let self = this;
        self.skin.removeEventListener(TBegin, self.onTBegin, self);
        self.skin.removeEventListener(TEnd, self.onTEnd, self);
        
        self.disposeTween();
        if (!!self._handler)
        {
            self._handler.dispose();
            tool.Pool.releaseObject(self._handler);
            self._handler = null;
        }
    }
}

class AlertDisplayCmp extends UICmp
{
    public bind(skin: any): void
    {
        super.bind(skin);
    }

    public run(scale: number): void
    {

    }

    public cancel(): void
    {

    }
}