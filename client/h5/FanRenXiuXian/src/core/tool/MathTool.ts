module tool 
{
	export class MathTool 
	{
		private constructor() {
		}

		/**快排
		 * compareFunction 的结果可以具有负值、0 或正值： 
		 * 若返回值为负，则表示 A 在排序后的序列中出现在 B 之前。
		 * 若返回值为 0，则表示 A 和 B 具有相同的排序顺序。
		 * 若返回值为正，则表示 A 在排序后的序列中出现在 B 之后。
		*/
		public static quickSort<T>(array: Array<T>, compareFn: (a: T, b: T) => number): void
		{
			if (array == null || array.length <= 1)
				return;
			let mid = array[0];
			let i = 1;
			let head = 0;
			let tail = array.length - 1;
			let tmp: T;
			while(head < tail)
			{
				if (compareFn(mid, array[i]) < 0)
				{//array[i]>mid,那么把其放到mid的右边
				//若返回值为负，则表示 mid 在排序后的序列中出现在 array[i] 之前。
					tmp = array[i];
					array[i] = array[tail];
					array[tail] = tmp;
					tail--;
				} else 
				{//array[i]<=mid,那么把其放到mid的左边
					tmp = array[i];
					array[i] = array[head];
					array[head] = array[i];
					head++;
					i++;
				}
			}
			array[head] = mid;
			MathTool.quickSort(array.slice(0, head), compareFn);
			MathTool.quickSort(array.slice(head+1, array.length), compareFn);
		}
	}
}