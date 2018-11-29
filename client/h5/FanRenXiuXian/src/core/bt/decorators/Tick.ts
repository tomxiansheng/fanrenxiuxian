module bt
{
	export class Tick extends BaseDecorator 
	{
		private _timeId: number;
		private _tick: number

		public reset(data: {tick: number}): void
		{
			let self = this;
			self._tick = data.tick;
			self.clearTime();
			super.reset(data);
		}

		private clearTime(): void
		{
			let self = this;
			if (self._timeId > 0)
			{
				egret.clearInterval(self._timeId);
				self._timeId = 0;
			}
		}

		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			self.state = BTState.Running;
			self._timeId = egret.setInterval(self.tickTime, self, self._tick);
			return self.state;
		}

		private async tickTime()
		{
			let self = this;
			let childState = await self.child.tick();
			self.state = childState;
			if (childState == BTState.Failure)
			{
				self.clearTime();
			}
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

		}
	}
}