module bt
{
    /**动作基类*/
    export interface IAction extends IBehaviour
    {

    }

    export abstract class BaseAction extends BaseBehaviour implements IAction
    {
        
    }
}