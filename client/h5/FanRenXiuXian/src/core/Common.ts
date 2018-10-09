interface IDispose
{
    dispose(): void;
}

interface IPage extends IDispose
{
    update(cmd: string, data?: any): void;
}

class Handler implements IDispose
{
    private _method: Function;
    private _args: Array<any>;
    private _thisObj: any;

    public addEvent(method: Function, thisObj: any, args?: Array<any>): void 
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