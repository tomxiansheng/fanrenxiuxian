/***
 * 1、不允许component之间互相调用
 * 2、如果存在顺序逻辑 需要自己实现
 * 3、component绑定数据必须写在ICmpData
 * 
*/

interface IUIBase extends IUpdate, IDispose
{
    show(data?: UIData): void;
    close(): void;
}

class UICmp implements ICmp
{
    protected skin: any;

    public bind(skin: any): void
    {
        this.skin = skin;
    }

    public update(cmd: string, data?: any): void
    {

    }

    public dispose(): void
    {
        this.skin = null;
    }
}
interface ICmpData
{
    /**如果都是可选参数 编译报错*/
    key: string;
    /**红点组件：RedPointCmp*/
    cfg_redPointCmp?: {[key: string]: RedPointData};
    /**tab组件：TabCmp*/
    cfg_tabCmp?: TabData[];
    /**点击组件：TouchCmp：短点击+长点击都是使用这个,需要初始化*/
    cfg_touchCmp?: {[key: number]: TouchCache};
    // /**返回组件：BackCmp*/
    // cfg_backCmp?: string;
}
//=====ui基类=================================================================
class CmpsUI extends eui.Component implements IUIBase, ICmpData
{   
    public key: string;

    protected cmpMap: {[key: string]: UICmp} = {};

    protected childrenCreated(): void
    {
        super.childrenCreated();
        let self = this;
        self.initCmps();
    }

    protected initCmps(): void
    {
        
    }
    /**如果存在该组件直接返回，否则添加*/
    public add<T extends UICmp>(cls: {new (): T}): T
    {
        let self = this;
        let key = tool.Pool.getKeyByCls(cls);
        let obj = self.cmpMap[key] as T;
        if (!self.cmpMap[key])
        {
            obj = tool.Pool.getObject(cls);
            obj.bind(this);
            self.cmpMap[key] = obj;
        }
        return obj;
    }

    public remove<T extends UICmp>(cls: {new (): T}): T
    {
        let self = this;
        let key = tool.Pool.getKeyByCls(cls);
        let obj = self.cmpMap[key] as T;
        delete self.cmpMap[key];
        return obj;
    }

    public getCmp<T extends UICmp>(cls: {new (): T}): T
    {
        return this.cmpMap[tool.Pool.getKeyByCls(cls)] as T;
    } 

    public show(data?: UIData): void
    {
        //显示
        this.visible = true;
        this.update("show", data);
    }

    public close(): void
    {
        this.visible = false;
        //移除点击
        this.update("close")
    }

    public update(cmd: string, data?: any): void
    {
        let self = this;
        for (let key in self.cmpMap)
        {
            self.cmpMap[key].update(cmd, data);
        }
    }

    public dispose(): void
    {
        this.update("dispose");
    }
}

class UIData
{
    redPointKeys?: string[];
    data?: any;
}