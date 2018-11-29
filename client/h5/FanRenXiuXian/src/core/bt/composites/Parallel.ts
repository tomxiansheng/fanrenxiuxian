module bt
{
	export enum EParallel
	{
		requireOne,
		requireAll,
		requireSome,
	}

	export class Parallel extends BaseComposite 
	{
		private _parallel: EParallel;

		public reset(data: {parallel: EParallel}): void
		{
			let self = this;
			self._parallel = data.parallel;
			super.reset(data);
		}
		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			self.state = BTState.Running;
			if (self._parallel == EParallel.requireAll)
			{
				await self.requireAll();
			} else if (self._parallel == EParallel.requireOne)
			{
				await self.requireOne();
			} else if (self._parallel == EParallel.requireSome)
			{
				await self.requireSome();
			}
			return self.state;
		}

		private async requireOne()
		{
			let self = this;
			for (let child of self.children)
			{
				let childState = await child.tick();
				if (childState == BTState.Success)
					return self.state = BTState.Success;
			}
			return self.state = BTState.Failure;
		}

		private async requireAll()
		{
			let self = this;
			for (let child of self.children)
			{
				let childState = await child.tick();
				if (childState == BTState.Failure)
					return self.state = BTState.Failure;
			}
			return self.state = BTState.Success;
		}

		private async requireSome()
		{
			let self = this;
			for (let child of self.children)
			{
				child.tick();
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
	}
}