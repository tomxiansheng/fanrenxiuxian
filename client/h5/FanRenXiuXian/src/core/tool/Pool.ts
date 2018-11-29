module tool {
	export class Pool {

		public static POOL_FLAG = "__InPool";

		private constructor() {
			//私有构建
		}

		private static _poolDic = {};
		/**
         * 通过对象获取key
         * @param object 对象
         */
		public static getKeyByObj<T>(object: T): string 
        {
            return egret.getQualifiedClassName(object);//object["__proto__"]["__class__"];
        }
		/**
         * 通过类名获取key
         * @param cls 类名
         */
        public static getKeyByCls<T>(cls: {new (): T}): string 
        {
            return egret.getQualifiedClassName(cls);
        }
 		/**
         * 对象池中获取一个对象
         * @param cls 类名
         */
		public static getObject<T>(cls: {new (): T}): T 
		{
			let key = Pool.getKeyByCls(cls);
			let pool = Pool.getPoolByKey(key);
			let object : T;

			if (pool.length > 0)
				object = pool.pop();
			else 
				object = new cls();

			object[Pool.POOL_FLAG] = false;

			return object;
		}
		/**
         * 通过key获取对象池，cls用来构建类（这里暂时不考虑反射）
		 * 提供这个方法是为了自定义key的使用
         * @param cls 类名
         */
		public static getObjectByKey<T>(clsName: string) : T
		{
			let pool = Pool.getPoolByKey(clsName);
			let object : T;

			if (pool.length > 0)
				object = pool.pop();
			else 
			{
				let cls = egret.getDefinitionByName(clsName);
				object = new cls();
			}

			object[Pool.POOL_FLAG] = false;

			return object;
		}
		/**
         * 将对象释放到对象池
         * @param object 类名
         */
		public static releaseObject<T>(object : T): void
		{
			let key = Pool.getKeyByObj(object);
			Pool.releaseObjectByKey(key, object);
		}
		/**
         * 将对象释放到对象池
		 * 提供这个方法是为了自定义key的使用
         * @param object 类名
         */
		public static releaseObjectByKey<T>(clsName: string, object: T): void
		{
			let pool = Pool.getPoolByKey(clsName);

			object[Pool.POOL_FLAG] = true;
			
			pool.push(object);
		}
		/**
         * 将对象池删除
         * @param cls 类名
         */
		public static disposePool<T>(cls: {new () : T}): void
		{
			let key = Pool.getKeyByCls(cls);
			Pool.disposePoolByKey(key);
		}
		/**
         * 将对象池删除
         * @param cls 类名
         */
		public static disposePoolByKey(key: string): void
		{
			delete Pool._poolDic[key];
		}
		/**
         * 获取对象池
         * @param cls 类名
         */
		public static getPool<T>(cls: {new (): T}): Array<T>
		{
			let key = Pool.getKeyByCls(cls);
			return Pool.getPoolByKey(key);
		}
		/**
         * 通过key获取对象池
         * @param cls 类名
         */
		public static getPoolByKey(key: string): any[]
		{
			return Pool._poolDic[key] || (Pool._poolDic[key] = []);
		}
	}
}