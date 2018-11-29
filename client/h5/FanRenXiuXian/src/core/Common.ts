interface IDispose
{
    dispose(): void;
}

interface IUpdate extends IDispose
{
    update(cmd: string, data?: any): void;
}

interface IResize
{
    onResize(stageW: number, stageH: number): void;
}

class Handler implements IDispose
{
    private _method: Function;
    private _args: Array<any>;
    private _thisObj: any;

    public add(method: Function, thisObj: any, args?: Array<any>): void 
    {
        this._method = method;
        this._thisObj = thisObj;
        this._args = args;
    }

    /**执行处理*/
    public execute(data?: Array<any>): void 
    {
        if (data == null)
            this._method.apply(this._thisObj, this._args);

        if (this._method)
            this._method.apply(this._thisObj, this._args ? data.concat(this._args) : data);
    }

    public dispose(): void
    {
        this._method = null;
        this._args = null;
        this._thisObj = null;
    }

    public get method(): Function
    {
        return this._method;
    }

    public get args(): Array<any>
    {
        return this._args;
    }

    public get thisObj(): any
    {
        return this._thisObj;
    }
}

const enum GameEvent
{
    resize = 1,
    TEnd = 2,
    TCancel = 3,
    TTap = 4,
}

interface IGameEventHandler
{
    gameEventHandler(geid: GameEvent, ...args): void;
}

class GameTime
{
    /** 上次Update被调用以后的时间 */
	public elapsedGameTime : number;
	/** 自游戏开始时到现在的游戏总时间量 */
	public totalGameTime   : number;
}

interface IUpdateGameTime extends IDispose
{
    updateGameTime(time: GameTime): void;
}

interface ICmp extends IUpdate, IDispose
{
    // single?: boolean;
    bind(data: any): void;
}

class CmpList
{
    private _cmpMap: {[key: string]: ICmp} = {};

    public addFn: (t: ICmp)=>void;
    public removeFn: (t: ICmp)=>void;
    public thisObj: any;

    public addCmp<T extends ICmp>(cls: {new (): T}): void
    {
        let self = this;
        let key = tool.Pool.getKeyByCls(cls);
        if (!!self._cmpMap[key])
            return;
        
        let t = tool.Pool.getObject(cls);
        self._cmpMap[key] = t;

        if (!!self.addFn)
            self.addFn.apply(self.thisObj, [t]);
    }

    public removeCmp1<T extends ICmp>(cls: {new (): T}): void
    {
        let self = this;
        let key = tool.Pool.getKeyByCls(cls);
        if (!self._cmpMap[key])
            return;
        let cmp = self._cmpMap[key];

        if (!!self.removeFn)
            self.removeFn.apply(self.thisObj, [cmp]);

        cmp.dispose();
        tool.Pool.releaseObject(cmp);
        delete self._cmpMap[key];
    }

    public removeCmp2<T extends ICmp>(t: T): void
    {
        let self = this;
        let key = tool.Pool.getKeyByObj(t);
        if (!self._cmpMap[key])
            return;
        let cmp = self._cmpMap[key];
        
        if (!!self.removeFn)
            self.removeFn.apply(self.thisObj, [cmp]);

        cmp.dispose();
        tool.Pool.releaseObject(cmp);
        delete self._cmpMap[key];
    }

    public getCmp<T extends ICmp>(cls: {new (): T}): T
    {
        return this._cmpMap[tool.Pool.getKeyByCls(cls)] as T;
    }
}