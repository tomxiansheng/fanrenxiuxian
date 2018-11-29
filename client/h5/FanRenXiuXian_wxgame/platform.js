/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'
    	
    openDataContext = new WxgameOpenDataContext();

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

	shareAppMessage(title, imgurl, query) {
		return new Promise((resolve, reject) => {
			wx.showAppMessage({
				title: title,
				imageUrl: imgurl,
				query: query,
				success: res => {
					resolve(true);
				}
				fail: res => {
					console.log(res);
					resolve(false);
				}
			})
		})
	}
	
	updateShareMenu(withShareTicket) {
		return new Promise((resolve, reject) => {
			wx.updateShareMenu({
				withShareTicket: withShareTicket,
				success: res => {
					resolve(res)
				},
				fail: res => {
					resolve(false)
				}
			})
		})
	}
	
	shareApp(title, imgurl, query) {
		return this.updateShareMenu(true).then((res) => {
			if (res) {
				return new Promise((resolve, reject) => {
					wx.shareAppMessage({
						title: title,
						imageUrl: imgurl,
						query: query,
						success: res => {
							resolve(res);
						},
						fail: res => {
							console.log(res);
							resolve(false);
						}
					})
				})
			}
		})
	}
	
	showAD() {
		console.log("未实现");
	}
    
    setUserCloudStorage(KVDataList) {
    	return new Promise((resolve, reject) => {
    		wx.setUserCloudStorage({
    			KVDataList: KVDataList,
    			success: res => {
    				console.log('success', res);
    				resolve(res);
    			},
    			fail: res => {
    				console.log('fail', res);
    			}
    		})
    	})
    }
    
    sendShareData(kvdata) {
    	let openDataContext = wx.getOpenDataContext();
    	openDataContext.postMessage(kvdata);
    }
    
    getLaunchOptionsSync() {
    	return wx.getLaunchOptionsSync();
    }
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();