module bt
{
	export interface IBehaviour extends IDispose
	{
		/**重启*/
		reset(data?: any): void;
		/**运行*/
		tick(): Promise<BTState>;
		/**结束*/
		onFinish(): void;

		addChild(child: IBehaviour): void;
	}

	export abstract class BaseBehaviour implements IBehaviour
	{
		protected name: string;
		private _state: BTState;
		protected dataCache: any;

		public set state(value: BTState)
		{
			let self = this;

			self._state = value;

			if (self._state == BTState.Invalid)
			{
				self.onInit();
			} else if (self._state == BTState.Success 
				|| self._state == BTState.Failure)
			{
				self.onFinish();
			}
		}

		public get state(): BTState
		{
			return this._state;
		}

		/**重启*/
		public reset(data?: any): void
		{
			let self = this;
			self.state = BTState.Invalid;
			self.dataCache = data;
		}
		/**运行*/
		abstract async tick(): Promise<BTState>;
		/**开始-Invalid*/
		abstract onInit(): void;
		/**结束-Success|Failure*/
		abstract onFinish(): void;

		public addChild(child: IBehaviour): void
		{

		}

		public dispose(): void
		{
			this.dataCache = null;
		}
	}

	export enum BTState
	{
		Success = 1,//成功
		Failure = 2,//失败
		Running = 3,//运行中
		Invalid = 4,//初始
	}
}