class EgretSubPackageLoading extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        EgretSubPackageLoading.instance = this;
    }

    onAddToStage() {
    	let self = this;
		self.bg = new egret.Bitmap();
		self.addChild(self.bg);
		let bgLoader = new egret.ImageLoader();
		bgLoader.addEventListener(egret.Event.COMPLETE, (evt)=>{
				let texture = new egret.Texture();
				texture.bitmapData = bgLoader.data;
				self.bg.texture = texture;
			})
		bgLoader.load("wxres/loadingBg.jpg");
			
		self.barBg = new egret.Bitmap();
		self.barBg.x = 150;
		self.barBg.y = self.stage.stageHeight - self.barBg.height>>1;
		self.addChild(self.barBg);
		let barBgLoader = new egret.ImageLoader();
		barBgLoader.addEventListener(egret.Event.COMPLETE, (evt)=>{
				let texture = new egret.Texture();
				texture.bitmapData = barBgLoader.data;
				self.barBg.texture = texture;
			})
		barBgLoader.load("wxres/barBg.png");
			
		self.bar = new egret.Bitmap();
		self.bar.x = self.barBg.x + 3;
		self.bar.y = self.barBg.y + 4;
		self.addChild(self.bar);
		let barLoader = new egret.ImageLoader();
		barLoader.addEventListener(egret.Event.COMPLETE, (evt)=>{
				let texture = new egret.Texture();
				texture.bitmapData = barLoader.data;
				self.bar.texture = texture;
			})
		barLoader.load("wxres/bar.png");

		self.barTxt = new egret.TextField();
		self.barTxt.textAlign = egret.HorizontalAlign.CENTER;
		self.barTxt.width = self.stage.stageWidth;
		self.barTxt.y = self.barBg.y;
		self.barTxt.textColor = 0xff0000;
		self.barTxt.text = "0 / 100";
		self.addChild(self.barTxt);
    }
    
    createBitmapByName(name) {
        let result = new egret.Bitmap();
        let texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    setProgress(res) {
        // iOS真机为totalBytesWriten 微信官方将于近期修复 2018.6.19
		this.barTxt.text = `${res.progress} / 100`;

		this.bar.width = (res.progress / 100) * this.barBg.width;
		console.log(res.progress);
    }

    onSuccess() {
        const stage = this.stage;
        stage.removeChild(this);
        EgretSubPackageLoading.instance = null;
        // 创建文档类，开发者需要根据自身项目更改
        const main = new Main();
        stage.addChild(main);
    }
}

window.EgretSubPackageLoading = EgretSubPackageLoading;