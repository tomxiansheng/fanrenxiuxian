module bt
{
	export class Selector extends BaseComposite
	{
		/**运行*/
		public async tick(): Promise<BTState>
		{
			let self = this;
			self.state = BTState.Running;
			for (let child of self.children)
			{
				let childState = await child.tick();
				
				if (childState == BTState.Success)
				{
					return self.state = BTState.Success;
				}
			}
			return self.state = BTState.Failure;
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