require('./weapp-adapter.js');
require('./platform.js');
require('./manifest.js');
require('./egret.wxgame.js');

// 启动微信小游戏本地缓存，如果开发者不需要此功能，只需注释即可
// 只有使用 assetsmanager 的项目可以使用
if(window.RES && RES.processor) {
    require('./library/image.js');
    require('./library/text.js');
    require('./library/sound.js');
    require('./library/binary.js');
}

//window.DOMParser = require("./xmldom/xmldom.js").DOMParser;

let runOptions = {
    //以下为自动修改，请勿修改
    //The following is automatically modified, please do not modify
    //----auto option start----
		entryClassName: "Main",
		orientation: "auto",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		maxTouches: 2,
		//----auto option end----
    renderMode: 'webgl',
    audioType: 0,
    calculateCanvasScaleFactor: function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }
}

const runEgret = function () {
	egret.runEgret(runOptions);
}


if (wx.loadSubpackage) {
  require("./EgretSubPackageLoading.js");
  runOptions.entryClassName = "EgretSubPackageLoading";
  runEgret();
  let task = wx.loadSubpackage({
    // 开发者根据自身需求更改
    name: "subpackage",
    success: function () {
      EgretSubPackageLoading.instance.onSuccess();
	}
  });

  task.onProgressUpdate(res => {
    EgretSubPackageLoading.instance.setProgress(res);
  })
}
else {
  //
  require("./subpackage/game.js");
  runEgret();
}

//1、用户授权
/**
let button = wx.createUserInfoButton({
	type:'text',
	text:'获取用户信息',
	style:{
		left:10,
		top:76,
		width:200,
		height:40,
		lineHeight:40,
		backgroundColor:'#ff0000',
		color:'#ffffff',
		textAlign:'center',
		fontSize:16,
		borderRadius:4,
	}
});

button.onTap((res)=>{
	console.log(res);
})
*/

//2、通过login无需弹框授权
/**
wx.login({
	success:(res)=>{
		console.log(res);
	}
});
*/

//微信授权方案1：
/**
let handleUser = (res, code)=>{
	let user = {
		code: code,
		encryptedData: res.encryptedData,
		iv: res.iv,
		nickName: res.userInfo.nickName,
		gender: res.userInfo.gender,
		city: res.userInfo.city,
		province: res.userInfo.province,
		country: res.userInfo.country,
		avatarUrl: res.userInfo.avatarUrl,
	}
	console.log("userInfo数据:"+JSON.stringify(user));
};
wx.login({
	success:(res)=>{
		let code = res.code;
		wx.getSetting({
			success:(res)=>{
				if(res.authSetting['scope.userInfo']){
					console.log("已经授权:wx.getUserInfo");
					wx.getUserInfo({
						success: (res)=>{
							handleUser(res, code)
						}
					})
				} else {
					console.log("没有授权:wx.createUserInfoButton");
					let button = wx.createUserInfoButton({
						type:'text',
						text:'',
						style:{
							left:0,
							top:0,
							width:350,
							height:600,
							lineHeight:40,
							backgroundColor:'#00000000',
							color:'#ffffff',
							textAlign:'center',
						},
					});
					button.onTap((res)=>{
						button.hide();
						handleUser(res, "");
					});
				}
			},
		});
	}
})
*/
/**

const appid = "wx6ac3f5090a6b99c5";
const appsecret = "8026092a62539cfeb15dc0c741de5580";


wx.login({
		success: function(res) {
			console.log(res.errMsg);
			wx.request({
					url:"https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+appsecret+"&js_code="+res.code+"&grant_type=authorization_code"
				})
		},
		complete: function(res) {
			console.log("测试"+res);
		}
});
*/


// require("egret.min.js")
