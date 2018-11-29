module bt
{
	export class Repeat extends BaseDecorator
	{
		private _limit: number;
		private _count: number;

		public reset(data: {limit: number}): void
		{
			let self = this;
			self._limit = data.limit;
			self._count = 0;
			super.reset(data);
		}

		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			
			self.state = BTState.Running;

			while (self._limit == -1 || self._count < self._limit)
			{
				let childState = await self.child.tick();

				if (childState == BTState.Failure)
				{
					return self.state = childState;
				}

				if (childState == BTState.Success)
					self._count++;

				self.child.reset(self.dataCache);
			}
			
			return self.state = BTState.Success;
		}
		/**开始-Invalid*/
		public onInit(): void
		{

		}
		/**结束-Success|Failure*/
		public onFinish(): void
		{

		}

		public dispose(): void
		{
			let self = this;
			self._count = 0;
			self._limit = 0;
			super.dispose();
		}
	}
}