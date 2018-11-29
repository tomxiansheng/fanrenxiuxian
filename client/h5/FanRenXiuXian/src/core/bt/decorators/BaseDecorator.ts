module bt
{
	/**装饰节点*/
	export interface IDecorator extends IBehaviour
	{
		getChild(): IBehaviour;
	}

	export abstract class BaseDecorator extends BaseBehaviour implements IDecorator
	{
		protected child: IBehaviour;

		public addChild(child: IBehaviour): void
		{
			this.child = child;
		}

		public getChild(): IBehaviour
		{
			return this.child;
		}

		public reset(data?: any): void
		{
			let self = this;
			self.reset(data);
			super.reset(data);
		}

		public dispose(): void
		{
			let self = this;
			self.child.dispose();
			self.child = null;
			super.dispose();
		}
	}
}