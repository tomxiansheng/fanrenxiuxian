module bt
{
	export class SelectorRandom extends BaseComposite
	{
		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			self.state = BTState.Running;
			let random = Math.floor(Math.random()*self.children.length);
			let childState = await self.children[random].tick();
			return self.state = childState;
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