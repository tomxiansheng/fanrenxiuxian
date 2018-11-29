class World
{
    public static readonly Inst: World = new World();

    private _cmpDic: CmpList;
    private _updateCmps: ICmp[];

    private _stage: egret.Stage;
    private _mainLayer: MainLayer;

    private _gameState: StateBase;

    private constructor()
    {
    }

    public init(data: any): void
    {
        let self = this;

        self._stage = data;

        self._updateCmps = [];
        self._cmpDic = new CmpList();
        self._cmpDic.thisObj = this;
        self._cmpDic.addFn = self.onCmpAdded;
        self._cmpDic.removeFn = self.onCmpRemoved;

        self.swapGameState(GameState);
    }

    public update(cmd: string, data?: any): void
    {

    }

    public swapGameState<T extends StateBase>(cls: {new (): T}): void
    {
        let self = this;
        if (tool.Pool.getKeyByCls(cls) == tool.Pool.getKeyByObj(self._gameState))
        {
            return;
        }
        if (!!self._gameState)
        {
            self._gameState.disEnter();
            tool.Pool.releaseObject(self._gameState);
        }
        self._gameState = tool.Pool.getObject(cls);
        self._gameState.enter();
    }

    public addCmp<T extends ICmp>(cls: {new (): T}): void
    {
        this._cmpDic.addCmp(cls);
    }

    public removeCmp<T extends ICmp>(cls: {new (): T}, isDelete: boolean = false): void
    {
        let self = this;
        if (isDelete)
        {
            self._cmpDic.removeCmp1(cls);
        } else 
        {
            self.onCmpRemoved(self._cmpDic.getCmp(cls));
        }
    }

    public getCmp<T extends ICmp>(cls: {new (): T}): T
    {
        return this._cmpDic.getCmp(cls);
    }

    private onCmpAdded(cmp: ICmp): void
    {
        let self = this;
        self._updateCmps.push(cmp);
    }

    private onCmpRemoved(cmp: ICmp): void
    {
        let self = this;
        let index = self._updateCmps.indexOf(cmp);
        if (index >= 0)
        {
            self._updateCmps.splice(index, 1);
        }
    }

    public get gameTime(): GameTime
    {
        return this._gameState.gameTime;
    }
}

abstract class StateBase
{
    public gameTime: GameTime;

    abstract enter(): void;

    abstract disEnter(): void;
}

class GameState extends StateBase
{
    public enter(): void
    {
        let self = this;

        World.Inst.addCmp(Zone);
        World.Inst.addCmp(Hud);
        World.Inst.addCmp(PlayerControl);

        self.gameTime = new GameTime();
    }

    public disEnter(): void
    {
        World.Inst.removeCmp(Zone);
        World.Inst.removeCmp(Hud);
        World.Inst.removeCmp(PlayerControl);
    }
}