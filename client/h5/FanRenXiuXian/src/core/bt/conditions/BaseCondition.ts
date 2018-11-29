module bt
{
	/**条件基类*/
	export interface ICondition extends IBehaviour
	{
		isNegation(): boolean;

		setNegation(value: boolean): void;
	}

	export abstract class BaseCondition extends BaseBehaviour implements ICondition
	{
		protected negation: boolean;

		public isNegation(): boolean
		{
			return this.negation;
		}

		public setNegation(value: boolean): void
		{
			this.negation = value;
		}
	}
}