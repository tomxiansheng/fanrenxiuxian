module tool {
	export class PhoneUtils {
		/**手机地理信息
		 * @param thisObj this指向
		 * @param upFn 更新信息，返回true 继续执行，反之clear
		 * @param ...args 额外数据
		 * @return 返回一个clear函数
		*/
		public static shakePhone(thisObj: any, upFn: (xAngle: number, yAngle: number, zxAngle: number, ...args)=>boolean, ...args): ()=>void
		{
			if (!upFn)
				return;
			let orientation = tool.Pool.getObject(egret.DeviceOrientation);
			let clear = ()=>
			{
				if (orientation)
				{
					orientation.removeEventListener(egret.Event.CHANGE, onorientationchange, thisObj);
					orientation.stop();
				}
			}
			let onOrientation = (e: egret.OrientationEvent)=>
			{
				let isRunning: boolean = true;
				//x、y、z
				if (args)
					isRunning = upFn.apply(thisObj, [e.beta, e.gamma, e.alpha].concat(args));
				else
					isRunning = upFn.apply(thisObj, [e.beta, e.gamma, e.alpha]);

				if (!isRunning)
					clear();
			}
			orientation.addEventListener(egret.Event.CHANGE, onOrientation, thisObj);
			orientation.start();
			return clear;
		}
	}
}