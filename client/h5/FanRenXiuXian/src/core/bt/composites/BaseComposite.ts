module bt
{
	/**组合节点*/
	export interface IComposite extends IBehaviour
	{
		addChild(child: IBehaviour, index?: number): void;

		removeChild(child: IBehaviour): void;

		removeChildAt(index: number): void;

		clearChild(): void;
	}

	export abstract class BaseComposite extends BaseBehaviour implements IComposite
	{
		protected children: IBehaviour[] = [];

		public addChild(child: IBehaviour, index?: number): void
		{
			let self = this;
			if (index)
			{
				self.children.splice(index, 0, child);
			} else 
			{
				self.children.push(child);
			}
		}

		public removeChild(child: IBehaviour): void
		{
			let self = this;
			let index = self.children.indexOf(child);
			if (index > -1)
			{
				self.children.splice(index, 1);
			}
		}

		public removeChildAt(index: number): void
		{
			let self = this;
			if (index < self.children.length && index >= 0)
			{
				self.children.splice(index, 1);
			}
		}

		public clearChild(): void
		{
			this.children = [];
		}

		public reset(data?: any): void
		{
			let self = this;
			for (let behaviour of self.children)
			{
				behaviour.reset(data);
			}
		}

		public dispose(): void
		{
			let self = this;
			for (let behaviour of self.children)
			{
				behaviour.dispose();
			}
			super.dispose();
		}
	}
}