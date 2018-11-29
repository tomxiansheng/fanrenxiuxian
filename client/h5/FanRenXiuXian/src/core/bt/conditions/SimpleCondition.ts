module bt
{
	export class SimpleCondition extends BaseCondition
	{
		private _conditionFn: (...args) => boolean;
		private _conditionArgs: any[];

		public reset(data: {conditionFn: (...args) => boolean, conditionArgs?: any[]}): void
		{
			let self = this;
			self._conditionFn = data.conditionFn;
			self._conditionArgs = data.conditionArgs;
			super.reset(data);
		}
		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			let result = await self.check();
			if (result)
			{
				self.state = BTState.Success;
			} else 
			{
				self.state = BTState.Failure;
			}
			return self.state;
		}

		private check():Promise<Boolean>
		{
			let self = this;
			let result: boolean = self._conditionFn.apply(self, self._conditionArgs);
			return new Promise<Boolean>((resolve, reject)=>{
				resolve(result);
			});
		}
		/**开始-Invalid*/
		public onInit(): void
		{

		}
		/**结束-Success|Failure*/
		public onFinish(): void
		{

		}
	}
}