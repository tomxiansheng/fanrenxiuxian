module bt
{
	export class Wait extends BaseDecorator
	{
		private _wait: number;
		private _timeId: number;

		public reset(data: {wait: number}): void
		{
			let self = this;
			self._wait = data.wait;
			self.clearTime();
			super.reset(data);
		}

		private clearTime(): void
		{
			let self = this;
			if (self._timeId > 0)
			{
				egret.clearTimeout(self._timeId);
				self._timeId = 0;
			}
		}

		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			
			self.clearTime();
			self.waitTime(self._wait);
			self._timeId = egret.setTimeout(self.waitTime, self, self._wait);
			return self.state;
		}

		private async waitTime(wait: number)
		{
			let self = this;
			self.state = await self.child.tick();
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
			self.clearTime();
			self._wait = 0;
			super.dispose();
		}
	}
}