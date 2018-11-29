module bt
{
	export class SelectorProbability extends BaseComposite
	{
		private _selectorProbability: number[];
		private _total: number;

		public reset(data: {selectorProbability: number[]}): void
		{
			let self = this;
			self._total = 0;
			for (let probability of data.selectorProbability)
			{
				self._total += probability;
			}
			self._selectorProbability = data.selectorProbability;
			super.reset(data);
		}
		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			self.state = BTState.Running;
			let random = Math.floor(Math.random()*self._total);
			for (let i = 0; i < self._selectorProbability.length; i++)
			{
				random -= self._selectorProbability[i];
				if (random < 0)
				{
					if (i < self.children.length)
					{
						self.state = await self.children[i].tick();
						break;
					} else 
					{
						return self.state = BTState.Failure;
					}
				}
			}
			return self.state;
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