module bt
{
	export class BehaviorCreator 
	{
		public static readonly Inst: BehaviorCreator = new BehaviorCreator();

		private _stack: IBehaviour[] = [];
		private _root: IBehaviour;

		private constructor()
		{
		}

		public addChild(child: IBehaviour): BehaviorCreator
		{
			let self = this;
			if (!self._root)
				self._root = child;
			self._stack.push(child);
			return self;
		}

		public back(): BehaviorCreator
		{
			let self = this;
			self._stack.pop();
			return self;
		}

		public end(): IBehaviour
		{
			let self = this;
			self._stack = [];
			let root = self._root;
			self._root = null;
			return root;
		}
	}
}
