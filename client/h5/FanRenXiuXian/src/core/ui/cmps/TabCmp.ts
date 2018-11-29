//=====tab组件=================================================================
interface TabData
{
    tab: egret.DisplayObject;
    /**切换page对应 cls 或者 egret.DisplayObject*/
    page?: any;
    /**page 所在的容器，pagecls构建成pageSkin时，add进container；container默认为tab.parent*/
    container?: egret.DisplayObjectContainer;
    /**page.x的偏移*/
    offX?: number;
    /**page.y的偏移*/
    OffY?: number;
}

class TabCmp extends UICmp
{
    private _tabs: TabData[];

    private _curData: TabData;

    public selectFn: (tabData: TabData, isSelected: boolean)=>void;

    public bind(skin: any): void
    {
        super.bind(skin);

        this.tabs = skin.cfg_tabCmp;
    }

    public set tabs(value: TabData[])
    {
        let self = this;
        
        if (!!value)
        {
            for (let data of self.tabs)
            {
                self.setEvt(data, true);
            }
        }
    }

    public get tabs(): TabData[]
    {
        return this._tabs;
    }

    private setEvt(data: TabData, isAdd: boolean): void
    {
        if (data == null)
            return;
        let self = this;
        if (isAdd)
        {
            data.tab.addEventListener(TTap, self.onTabSelect, self);
        } else 
        {
            data.tab.removeEventListener(TTap, self.onTabSelect, self);
        }
    }

    private onTabSelect(evt: egret.TouchEvent): void
    {
        let self = this;
        if (self.selectFn == null)
        {   
            return;
        }
        let tab = evt.currentTarget;
        for (let data of self.tabs)
        {
            if (tab == data.tab)
            {
                self.setPage(false);
                self._curData = data;
                self.setPage(true);
                self.selectFn.apply(self.skin, [data, true]);
            } else 
            {
                self.selectFn.apply(self.skin, [data, false]);
            }
        }
    }

    private setPage(isAdd: boolean): void
    {
        let self = this;
        if (self._curData == null)
            return;

        let container = self._curData.container;
        if (container == null) 
            container = self._curData.tab.parent;
        
        let page = self._curData.page;
        if (page == null)
            return;

        if (isAdd)
        {
            if (page instanceof egret.DisplayObject)
            {

            } else 
            {
                page = tool.Pool.getObject(self._curData.page) as egret.DisplayObject;
                self._curData.page = page;
            }
            if (page.parent == null)
                container.addChild(page);
            page.visible = true;
        } else 
        {
            //到底是visible设置成false
            //还是removeChild 有待考证
            if (page instanceof egret.DisplayObject)
                page.visible = false;
        }
    }

    private disposeTabs(): void
    {
        let self = this;
        if (!!self.tabs)
        {
            for (let data of self.tabs)
            {
                if (!data.page[tool.Pool.POOL_FLAG])
                    tool.Pool.releaseObject(data.page);
                self.setEvt(data, false);
            }
        }
        self.tabs = null;
    }

    public dispose(): void
    {
        this.selectFn = null;
    }
}
//=====tab组件=================================================================