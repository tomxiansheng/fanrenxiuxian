var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var bt;
(function (bt) {
    var BaseBehaviour = (function () {
        function BaseBehaviour() {
        }
        Object.defineProperty(BaseBehaviour.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (value) {
                var self = this;
                self._state = value;
                if (self._state == BTState.Invalid) {
                    self.onInit();
                }
                else if (self._state == BTState.Success
                    || self._state == BTState.Failure) {
                    self.onFinish();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**重启*/
        BaseBehaviour.prototype.reset = function (data) {
            var self = this;
            self.state = BTState.Invalid;
            self.dataCache = data;
        };
        BaseBehaviour.prototype.addChild = function (child) {
        };
        BaseBehaviour.prototype.dispose = function () {
            this.dataCache = null;
        };
        return BaseBehaviour;
    }());
    bt.BaseBehaviour = BaseBehaviour;
    __reflect(BaseBehaviour.prototype, "bt.BaseBehaviour", ["bt.IBehaviour", "IDispose"]);
    var BTState;
    (function (BTState) {
        BTState[BTState["Success"] = 1] = "Success";
        BTState[BTState["Failure"] = 2] = "Failure";
        BTState[BTState["Running"] = 3] = "Running";
        BTState[BTState["Invalid"] = 4] = "Invalid";
    })(BTState = bt.BTState || (bt.BTState = {}));
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BaseComposite = (function (_super) {
        __extends(BaseComposite, _super);
        function BaseComposite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.children = [];
            return _this;
        }
        BaseComposite.prototype.addChild = function (child, index) {
            var self = this;
            if (index) {
                self.children.splice(index, 0, child);
            }
            else {
                self.children.push(child);
            }
        };
        BaseComposite.prototype.removeChild = function (child) {
            var self = this;
            var index = self.children.indexOf(child);
            if (index > -1) {
                self.children.splice(index, 1);
            }
        };
        BaseComposite.prototype.removeChildAt = function (index) {
            var self = this;
            if (index < self.children.length && index >= 0) {
                self.children.splice(index, 1);
            }
        };
        BaseComposite.prototype.clearChild = function () {
            this.children = [];
        };
        BaseComposite.prototype.reset = function (data) {
            var self = this;
            for (var _i = 0, _a = self.children; _i < _a.length; _i++) {
                var behaviour = _a[_i];
                behaviour.reset(data);
            }
        };
        BaseComposite.prototype.dispose = function () {
            var self = this;
            for (var _i = 0, _a = self.children; _i < _a.length; _i++) {
                var behaviour = _a[_i];
                behaviour.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        return BaseComposite;
    }(bt.BaseBehaviour));
    bt.BaseComposite = BaseComposite;
    __reflect(BaseComposite.prototype, "bt.BaseComposite", ["bt.IComposite"]);
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BaseCondition = (function (_super) {
        __extends(BaseCondition, _super);
        function BaseCondition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseCondition.prototype.isNegation = function () {
            return this.negation;
        };
        BaseCondition.prototype.setNegation = function (value) {
            this.negation = value;
        };
        return BaseCondition;
    }(bt.BaseBehaviour));
    bt.BaseCondition = BaseCondition;
    __reflect(BaseCondition.prototype, "bt.BaseCondition", ["bt.ICondition"]);
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BaseDecorator = (function (_super) {
        __extends(BaseDecorator, _super);
        function BaseDecorator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseDecorator.prototype.addChild = function (child) {
            this.child = child;
        };
        BaseDecorator.prototype.getChild = function () {
            return this.child;
        };
        BaseDecorator.prototype.reset = function (data) {
            var self = this;
            self.reset(data);
            _super.prototype.reset.call(this, data);
        };
        BaseDecorator.prototype.dispose = function () {
            var self = this;
            self.child.dispose();
            self.child = null;
            _super.prototype.dispose.call(this);
        };
        return BaseDecorator;
    }(bt.BaseBehaviour));
    bt.BaseDecorator = BaseDecorator;
    __reflect(BaseDecorator.prototype, "bt.BaseDecorator", ["bt.IDecorator"]);
})(bt || (bt = {}));
/***
 * 1、不允许component之间互相调用
 * 2、如果存在顺序逻辑 需要自己实现
 * 3、component绑定数据必须写在ICmpData
 *
*/
var UICmp = (function () {
    function UICmp() {
    }
    UICmp.prototype.bind = function (skin) {
        this.skin = skin;
    };
    UICmp.prototype.update = function (cmd, data) {
    };
    UICmp.prototype.dispose = function () {
        this.skin = null;
    };
    return UICmp;
}());
__reflect(UICmp.prototype, "UICmp", ["ICmp", "IUpdate", "IDispose"]);
//=====ui基类=================================================================
var CmpsUI = (function (_super) {
    __extends(CmpsUI, _super);
    function CmpsUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cmpMap = {};
        return _this;
    }
    CmpsUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var self = this;
        self.initCmps();
    };
    CmpsUI.prototype.initCmps = function () {
    };
    CmpsUI.prototype.add = function (cls) {
        var self = this;
        var key = tool.Pool.getKeyByCls(cls);
        var obj = tool.Pool.getObject(cls);
        obj.bind(this);
        self.cmpMap[key] = obj;
        return obj;
    };
    CmpsUI.prototype.remove = function (cls) {
        var self = this;
        var key = tool.Pool.getKeyByCls(cls);
        var obj = self.cmpMap[key];
        delete self.cmpMap[key];
        return obj;
    };
    CmpsUI.prototype.getCmp = function (cls) {
        return this.cmpMap[tool.Pool.getKeyByCls(cls)];
    };
    CmpsUI.prototype.show = function (data) {
        //显示
        this.visible = true;
        this.update("show", data);
    };
    CmpsUI.prototype.close = function () {
        this.visible = false;
        //移除点击
        this.update("close");
    };
    CmpsUI.prototype.update = function (cmd, data) {
        var self = this;
        for (var key in self.cmpMap) {
            self.cmpMap[key].update(cmd, data);
        }
    };
    CmpsUI.prototype.dispose = function () {
        this.update("dispose");
    };
    return CmpsUI;
}(eui.Component));
__reflect(CmpsUI.prototype, "CmpsUI", ["IUIBase", "IUpdate", "IDispose", "ICmpData"]);
var UIData = (function () {
    function UIData() {
    }
    return UIData;
}());
__reflect(UIData.prototype, "UIData");
var AStarNode = (function () {
    function AStarNode() {
    }
    AStarNode.prototype.updateParent = function (parent, g) {
        var self = this;
        self.parent = parent;
        self.G = g;
        self.F = g + self.H;
    };
    AStarNode.prototype.dispose = function () {
        var self = this;
        self.parent = null;
        self.isClosed = false;
        self.G = 0;
        self.H = 0;
        self.F = 0;
        self.x = 0;
        self.y = 0;
    };
    return AStarNode;
}());
__reflect(AStarNode.prototype, "AStarNode", ["IDispose"]);
var AStar = (function () {
    function AStar() {
        this._cacheAStarNodes = {};
    }
    AStar.prototype.bindMap = function (map) {
        var self = this;
        self._map = map;
    };
    /**二元堆插入*/
    AStar.prototype.insterList = function (list, target) {
        list.push(target);
        target.index = list.length - 1;
        var index = list.length;
        while (index == 0) {
            var rootIndex = Math.floor(index / 2) - 1;
            if (list[rootIndex].F > list[index].F) {
                var tmp = list[rootIndex];
                list[rootIndex] = list[index];
                list[rootIndex].index = rootIndex;
                list[index] = tmp;
                list[index].index = index;
                index = rootIndex;
            }
            else {
                break;
            }
        }
        return list;
    };
    /**二元堆删除*/
    AStar.prototype.deleteList = function (list, index) {
        list[index] = list[list.length - 1];
        list.pop();
        var child;
        while ((child = index * 2 + 1) < list.length) {
            if (list[index].F > list[child].F) {
                var tmp = list[index];
                list[child] = tmp;
                list[index] = list[child];
                index = child;
            }
            else {
                break;
            }
        }
        return list;
    };
    AStar.prototype.findPath = function (start, end) {
        var self = this;
        var startNode = tool.Pool.getObject(AStarNode);
        startNode.x = start.x;
        startNode.y = start.y;
        var endNode = tool.Pool.getObject(AStarNode);
        endNode.x = end.x;
        endNode.y = end.y;
        return self.findPath1(startNode, endNode);
    };
    AStar.prototype.findPath1 = function (start, end) {
        var self = this;
        //回收
        for (var key in self._cacheAStarNodes) {
            var tmp_1 = self._cacheAStarNodes[key];
            tmp_1.dispose();
            tool.Pool.releaseObject(tmp_1);
        }
        //二元堆
        var openList = [];
        openList = self.insterList(openList, start);
        while (openList.length > 0) {
            var point = self.findMinFOfPoint(openList);
            self.deleteList(openList, point.index);
            point.isClosed = true;
            self._cacheAStarNodes[(point.x * AStar.DEFAULT_OFF + point.y)] = point;
            var surroundPoints = self.getSurroundPoints(point);
            for (var _i = 0, surroundPoints_1 = surroundPoints; _i < surroundPoints_1.length; _i++) {
                var surroundPoint = surroundPoints_1[_i];
                if (openList.indexOf(surroundPoint) > -1) {
                    var nowG = self.caculateG(surroundPoint, surroundPoint.parent);
                    if (nowG < surroundPoint.G) {
                        surroundPoint.updateParent(point, nowG);
                    }
                }
                else {
                    surroundPoint.parent = point;
                    surroundPoint = self.caculateF(surroundPoint, end);
                    openList = self.insterList(openList, surroundPoint);
                }
            }
            if (openList.indexOf(end) > -1) {
                break;
            }
        }
        var result = [];
        var tmp = end;
        while (!tmp && tmp.parent != start) {
            result.push(tmp);
            tmp = tmp.parent;
        }
        return result.reverse();
    };
    AStar.prototype.findMinFOfPoint = function (openList) {
        //使用二元堆 最小F就是index=0
        return openList[0];
        // let f: number = Number.MAX_VALUE;
        // let temp: AStarNode;
        // for (let p of openList)
        // {
        // 	if (p.F < f)
        // 	{
        // 		temp = p;
        // 		f = p.F;
        // 	}
        // }
        // return temp;
    };
    AStar.prototype.getSurroundPoints = function (pos) {
        var self = this;
        var result = [];
        for (var _i = 0, _a = self._map.surroundpoints; _i < _a.length; _i++) {
            var surroundPoint = _a[_i];
            var x = surroundPoint.x + pos.x;
            var y = surroundPoint.y + pos.y;
            var astar = self._cacheAStarNodes[(x * AStar.DEFAULT_OFF + y)];
            if (!astar)
                astar = tool.Pool.getObject(AStarNode);
            astar.x = x;
            astar.y = y;
            if (!astar.isClosed && self._map.checkPointCanMove(astar))
                result.push(astar);
        }
        return result;
    };
    AStar.prototype.caculateG = function (point, parent) {
        return this._map.caculateG(point) + parent.G;
    };
    AStar.prototype.caculateF = function (point, end) {
        var self = this;
        var h = self._map.caculateH(point, end);
        var g;
        if (!point.parent) {
            g = 0;
        }
        else {
            g = self.caculateG(point, point.parent);
        }
        var f = g + h;
        point.F = f;
        point.G = g;
        point.H = h;
        return point;
    };
    AStar.DEFAULT_OFF = 1000;
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
var LayoutObj = (function () {
    function LayoutObj() {
    }
    LayoutObj.prototype.dispose = function () {
        var self = this;
        self.target = null;
        // self.x = 0;
        // self.y = 0;
        delete self.container;
        delete self.left;
        delete self.right;
        delete self.top;
        delete self.bottom;
    };
    return LayoutObj;
}());
__reflect(LayoutObj.prototype, "LayoutObj", ["IDispose"]);
var SimpleLayout = (function () {
    function SimpleLayout() {
        this._layOutObjMap = {};
    }
    SimpleLayout.prototype.onResize = function (stageW, stageH) {
        var self = this;
        var layOutObjMap = self._layOutObjMap;
        //第一次布局迭代
        for (var key in layOutObjMap) {
            self.iterateLayOut(layOutObjMap[key]);
        }
        //第二次布局迭代，防止存在 后续引用：比如a.container==b.target,但是a先调整布局，b后调整布局，导致a不准确
        for (var key in layOutObjMap) {
            self.iterateLayOut(layOutObjMap[key]);
        }
    };
    SimpleLayout.prototype.iterateLayOut = function (layOutObj) {
        var container = layOutObj.container;
        if (container == null)
            container = layOutObj.target.parent;
        if (container == null)
            return;
        var containerPos = container.localToGlobal();
        //如果left、right 都设置了 那么表示改变宽度
        if (layOutObj.left && layOutObj.right) {
            layOutObj.target.x = containerPos.x + layOutObj.left;
            layOutObj.target.width = container.width - layOutObj.left - layOutObj.right;
        }
        else if (layOutObj.left) {
            layOutObj.target.x = containerPos.x + layOutObj.left;
        }
        else if (layOutObj.right) {
            layOutObj.target.x = containerPos.x + container.width - (layOutObj.target.width + layOutObj.right);
        }
        //如果top、bottom 都设置了 那么表示改变高度
        if (layOutObj.top && layOutObj.bottom) {
            layOutObj.target.y = containerPos.y + layOutObj.top;
            layOutObj.target.height = container.height - layOutObj.top - layOutObj.bottom;
        }
        else if (layOutObj.top) {
            layOutObj.target.y = containerPos.y + layOutObj.top;
        }
        else if (layOutObj.bottom) {
            layOutObj.target.y = containerPos.y + container.height - (layOutObj.target.height + layOutObj.bottom);
        }
    };
    SimpleLayout.prototype.getLayOut = function (target) {
        if (target == null) {
            return;
        }
        var self = this;
        var layOutObj = self._layOutObjMap[target.hashCode];
        if (layOutObj == null) {
            layOutObj = tool.Pool.getObject(LayoutObj);
        }
        return layOutObj;
    };
    SimpleLayout.prototype.dispose = function (target) {
        if (target == null) {
            return;
        }
        var self = this;
        var layOutObj = self._layOutObjMap[target.hashCode];
        if (layOutObj) {
            layOutObj.dispose();
            tool.Pool.releaseObject(layOutObj);
            delete self._layOutObjMap[target.hashCode];
        }
    };
    SimpleLayout.prototype.checkHasLayOut = function (target) {
        return !!this._layOutObjMap[target.hashCode];
    };
    SimpleLayout.prototype.register = function (layOutObj) {
        var self = this;
        if (self.checkHasLayOut(layOutObj.target)) {
            return false;
        }
        self._layOutObjMap[layOutObj.target.hashCode] = layOutObj;
        return true;
    };
    SimpleLayout.Inst = new SimpleLayout();
    return SimpleLayout;
}());
__reflect(SimpleLayout.prototype, "SimpleLayout", ["IResize"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var bt;
(function (bt) {
    var BehaviorCreator = (function () {
        function BehaviorCreator() {
            this._stack = [];
        }
        BehaviorCreator.prototype.addChild = function (child) {
            var self = this;
            if (!self._root)
                self._root = child;
            self._stack.push(child);
            return self;
        };
        BehaviorCreator.prototype.back = function () {
            var self = this;
            self._stack.pop();
            return self;
        };
        BehaviorCreator.prototype.end = function () {
            var self = this;
            self._stack = [];
            var root = self._root;
            self._root = null;
            return root;
        };
        BehaviorCreator.Inst = new BehaviorCreator();
        return BehaviorCreator;
    }());
    bt.BehaviorCreator = BehaviorCreator;
    __reflect(BehaviorCreator.prototype, "bt.BehaviorCreator");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BaseAction = (function (_super) {
        __extends(BaseAction, _super);
        function BaseAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaseAction;
    }(bt.BaseBehaviour));
    bt.BaseAction = BaseAction;
    __reflect(BaseAction.prototype, "bt.BaseAction", ["bt.IAction"]);
})(bt || (bt = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        World.Inst.init(this.stage);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var bt;
(function (bt) {
    var EParallel;
    (function (EParallel) {
        EParallel[EParallel["requireOne"] = 0] = "requireOne";
        EParallel[EParallel["requireAll"] = 1] = "requireAll";
        EParallel[EParallel["requireSome"] = 2] = "requireSome";
    })(EParallel = bt.EParallel || (bt.EParallel = {}));
    var Parallel = (function (_super) {
        __extends(Parallel, _super);
        function Parallel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Parallel.prototype.reset = function (data) {
            var self = this;
            self._parallel = data.parallel;
            _super.prototype.reset.call(this, data);
        };
        /**运行*/
        Parallel.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            if (!(self._parallel == EParallel.requireAll)) return [3 /*break*/, 2];
                            return [4 /*yield*/, self.requireAll()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 2:
                            if (!(self._parallel == EParallel.requireOne)) return [3 /*break*/, 4];
                            return [4 /*yield*/, self.requireOne()];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(self._parallel == EParallel.requireSome)) return [3 /*break*/, 6];
                            return [4 /*yield*/, self.requireSome()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, self.state];
                    }
                });
            });
        };
        Parallel.prototype.requireOne = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, _i, _a, child, childState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            _i = 0, _a = self.children;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            child = _a[_i];
                            return [4 /*yield*/, child.tick()];
                        case 2:
                            childState = _b.sent();
                            if (childState == bt.BTState.Success)
                                return [2 /*return*/, self.state = bt.BTState.Success];
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, self.state = bt.BTState.Failure];
                    }
                });
            });
        };
        Parallel.prototype.requireAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, _i, _a, child, childState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            _i = 0, _a = self.children;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            child = _a[_i];
                            return [4 /*yield*/, child.tick()];
                        case 2:
                            childState = _b.sent();
                            if (childState == bt.BTState.Failure)
                                return [2 /*return*/, self.state = bt.BTState.Failure];
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, self.state = bt.BTState.Success];
                    }
                });
            });
        };
        Parallel.prototype.requireSome = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, _i, _a, child;
                return __generator(this, function (_b) {
                    self = this;
                    for (_i = 0, _a = self.children; _i < _a.length; _i++) {
                        child = _a[_i];
                        child.tick();
                    }
                    return [2 /*return*/, self.state = bt.BTState.Success];
                });
            });
        };
        /**开始-Invalid*/
        Parallel.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Parallel.prototype.onFinish = function () {
        };
        return Parallel;
    }(bt.BaseComposite));
    bt.Parallel = Parallel;
    __reflect(Parallel.prototype, "bt.Parallel");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Selector = (function (_super) {
        __extends(Selector, _super);
        function Selector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**运行*/
        Selector.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, _i, _a, child, childState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            _i = 0, _a = self.children;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            child = _a[_i];
                            return [4 /*yield*/, child.tick()];
                        case 2:
                            childState = _b.sent();
                            if (childState == bt.BTState.Success) {
                                return [2 /*return*/, self.state = bt.BTState.Success];
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, self.state = bt.BTState.Failure];
                    }
                });
            });
        };
        /**开始-Invalid*/
        Selector.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Selector.prototype.onFinish = function () {
        };
        return Selector;
    }(bt.BaseComposite));
    bt.Selector = Selector;
    __reflect(Selector.prototype, "bt.Selector");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var SelectorProbability = (function (_super) {
        __extends(SelectorProbability, _super);
        function SelectorProbability() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectorProbability.prototype.reset = function (data) {
            var self = this;
            self._total = 0;
            for (var _i = 0, _a = data.selectorProbability; _i < _a.length; _i++) {
                var probability = _a[_i];
                self._total += probability;
            }
            self._selectorProbability = data.selectorProbability;
            _super.prototype.reset.call(this, data);
        };
        /**运行*/
        SelectorProbability.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, random, i, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            random = Math.floor(Math.random() * self._total);
                            i = 0;
                            _b.label = 1;
                        case 1:
                            if (!(i < self._selectorProbability.length)) return [3 /*break*/, 5];
                            random -= self._selectorProbability[i];
                            if (!(random < 0)) return [3 /*break*/, 4];
                            if (!(i < self.children.length)) return [3 /*break*/, 3];
                            _a = self;
                            return [4 /*yield*/, self.children[i].tick()];
                        case 2:
                            _a.state = _b.sent();
                            return [3 /*break*/, 5];
                        case 3: return [2 /*return*/, self.state = bt.BTState.Failure];
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, self.state];
                    }
                });
            });
        };
        /**开始-Invalid*/
        SelectorProbability.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        SelectorProbability.prototype.onFinish = function () {
        };
        return SelectorProbability;
    }(bt.BaseComposite));
    bt.SelectorProbability = SelectorProbability;
    __reflect(SelectorProbability.prototype, "bt.SelectorProbability");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var SelectorRandom = (function (_super) {
        __extends(SelectorRandom, _super);
        function SelectorRandom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**运行*/
        SelectorRandom.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, random, childState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            random = Math.floor(Math.random() * self.children.length);
                            return [4 /*yield*/, self.children[random].tick()];
                        case 1:
                            childState = _a.sent();
                            return [2 /*return*/, self.state = childState];
                    }
                });
            });
        };
        /**开始-Invalid*/
        SelectorRandom.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        SelectorRandom.prototype.onFinish = function () {
        };
        return SelectorRandom;
    }(bt.BaseComposite));
    bt.SelectorRandom = SelectorRandom;
    __reflect(SelectorRandom.prototype, "bt.SelectorRandom");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Sequence = (function (_super) {
        __extends(Sequence, _super);
        function Sequence() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**运行*/
        Sequence.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, _i, _a, child, childState;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            _i = 0, _a = self.children;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            child = _a[_i];
                            return [4 /*yield*/, child.tick()];
                        case 2:
                            childState = _b.sent();
                            if (childState == bt.BTState.Failure) {
                                return [2 /*return*/, self.state = bt.BTState.Failure];
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, self.state = bt.BTState.Success];
                    }
                });
            });
        };
        /**开始-Invalid*/
        Sequence.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Sequence.prototype.onFinish = function () {
        };
        return Sequence;
    }(bt.BaseComposite));
    bt.Sequence = Sequence;
    __reflect(Sequence.prototype, "bt.Sequence");
})(bt || (bt = {}));
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.shareAppMessage = function (title, imgurl, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.updateShareMenu = function (withticket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.shareApp = function (title, imgurl, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showAD = function () {
    };
    DebugPlatform.prototype.setUserCloudStorage = function (kvobj) {
    };
    DebugPlatform.prototype.sendShareData = function (kvobj) {
    };
    DebugPlatform.prototype.getLaunchOptionsSync = function () {
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var bt;
(function (bt) {
    var SimpleCondition = (function (_super) {
        __extends(SimpleCondition, _super);
        function SimpleCondition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleCondition.prototype.reset = function (data) {
            var self = this;
            self._conditionFn = data.conditionFn;
            self._conditionArgs = data.conditionArgs;
            _super.prototype.reset.call(this, data);
        };
        /**运行*/
        SimpleCondition.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            return [4 /*yield*/, self.check()];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                self.state = bt.BTState.Success;
                            }
                            else {
                                self.state = bt.BTState.Failure;
                            }
                            return [2 /*return*/, self.state];
                    }
                });
            });
        };
        SimpleCondition.prototype.check = function () {
            var self = this;
            var result = self._conditionFn.apply(self, self._conditionArgs);
            return new Promise(function (resolve, reject) {
                resolve(result);
            });
        };
        /**开始-Invalid*/
        SimpleCondition.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        SimpleCondition.prototype.onFinish = function () {
        };
        return SimpleCondition;
    }(bt.BaseCondition));
    bt.SimpleCondition = SimpleCondition;
    __reflect(SimpleCondition.prototype, "bt.SimpleCondition");
})(bt || (bt = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var bt;
(function (bt) {
    var Repeat = (function (_super) {
        __extends(Repeat, _super);
        function Repeat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Repeat.prototype.reset = function (data) {
            var self = this;
            self._limit = data.limit;
            self._count = 0;
            _super.prototype.reset.call(this, data);
        };
        /**运行*/
        Repeat.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, childState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            self.state = bt.BTState.Running;
                            _a.label = 1;
                        case 1:
                            if (!(self._limit == -1 || self._count < self._limit)) return [3 /*break*/, 3];
                            return [4 /*yield*/, self.child.tick()];
                        case 2:
                            childState = _a.sent();
                            if (childState == bt.BTState.Failure) {
                                return [2 /*return*/, self.state = childState];
                            }
                            if (childState == bt.BTState.Success)
                                self._count++;
                            self.child.reset(self.dataCache);
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/, self.state = bt.BTState.Success];
                    }
                });
            });
        };
        /**开始-Invalid*/
        Repeat.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Repeat.prototype.onFinish = function () {
        };
        Repeat.prototype.dispose = function () {
            var self = this;
            self._count = 0;
            self._limit = 0;
            _super.prototype.dispose.call(this);
        };
        return Repeat;
    }(bt.BaseDecorator));
    bt.Repeat = Repeat;
    __reflect(Repeat.prototype, "bt.Repeat");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Tick = (function (_super) {
        __extends(Tick, _super);
        function Tick() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tick.prototype.reset = function (data) {
            var self = this;
            self._tick = data.tick;
            self.clearTime();
            _super.prototype.reset.call(this, data);
        };
        Tick.prototype.clearTime = function () {
            var self = this;
            if (self._timeId > 0) {
                egret.clearInterval(self._timeId);
                self._timeId = 0;
            }
        };
        /**运行*/
        Tick.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self;
                return __generator(this, function (_a) {
                    self = this;
                    self.state = bt.BTState.Running;
                    self._timeId = egret.setInterval(self.tickTime, self, self._tick);
                    return [2 /*return*/, self.state];
                });
            });
        };
        Tick.prototype.tickTime = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, childState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            return [4 /*yield*/, self.child.tick()];
                        case 1:
                            childState = _a.sent();
                            self.state = childState;
                            if (childState == bt.BTState.Failure) {
                                self.clearTime();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**开始-Invalid*/
        Tick.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Tick.prototype.onFinish = function () {
        };
        Tick.prototype.dispose = function () {
        };
        return Tick;
    }(bt.BaseDecorator));
    bt.Tick = Tick;
    __reflect(Tick.prototype, "bt.Tick");
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Wait = (function (_super) {
        __extends(Wait, _super);
        function Wait() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Wait.prototype.reset = function (data) {
            var self = this;
            self._wait = data.wait;
            self.clearTime();
            _super.prototype.reset.call(this, data);
        };
        Wait.prototype.clearTime = function () {
            var self = this;
            if (self._timeId > 0) {
                egret.clearTimeout(self._timeId);
                self._timeId = 0;
            }
        };
        /**运行*/
        Wait.prototype.tick = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self;
                return __generator(this, function (_a) {
                    self = this;
                    self.clearTime();
                    self.waitTime(self._wait);
                    self._timeId = egret.setTimeout(self.waitTime, self, self._wait);
                    return [2 /*return*/, self.state];
                });
            });
        };
        Wait.prototype.waitTime = function (wait) {
            return __awaiter(this, void 0, void 0, function () {
                var self, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            self = this;
                            _a = self;
                            return [4 /*yield*/, self.child.tick()];
                        case 1:
                            _a.state = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**开始-Invalid*/
        Wait.prototype.onInit = function () {
        };
        /**结束-Success|Failure*/
        Wait.prototype.onFinish = function () {
        };
        Wait.prototype.dispose = function () {
            var self = this;
            self.clearTime();
            self._wait = 0;
            _super.prototype.dispose.call(this);
        };
        return Wait;
    }(bt.BaseDecorator));
    bt.Wait = Wait;
    __reflect(Wait.prototype, "bt.Wait");
})(bt || (bt = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var MapTile = (function () {
    function MapTile() {
    }
    return MapTile;
}());
__reflect(MapTile.prototype, "MapTile");
var PathFinder = (function () {
    function PathFinder() {
    }
    return PathFinder;
}());
__reflect(PathFinder.prototype, "PathFinder");
var tool;
(function (tool) {
    var DrawUtils = (function () {
        function DrawUtils() {
        }
        /**cd绘制函数
         * @param target 需要绘制cd的对象，必须在显示列表里
         * @param offAngle 每次变化的角度
         * @param offTime 计时器时间（毫秒），如果<=0,只会运行一次。
         * @param radius 圆弧半径
         * @param isReverse 是否反向，360-curAngle
         * @param startAngle cd起始角度
         * @param thisObj this的指向控制
         * @param upFn 计时器运行时 调用的update方法：返回值boolean，返回true继续运行计时器，否则反之
         * @param ...args 需要传入upFn额外的参数
         * @return 返回clear函数，可以手动调用结束掉
        */
        DrawUtils.drawProgress = function (target, offAngle, offTime, radius, isReverse, startAngle, thisObj, upFn) {
            if (isReverse === void 0) { isReverse = false; }
            if (startAngle === void 0) { startAngle = 0; }
            var args = [];
            for (var _i = 8; _i < arguments.length; _i++) {
                args[_i - 8] = arguments[_i];
            }
            if (!target || !target.parent)
                return;
            var shape = target.parent.getChildByName("__drawProgress_shapeMask__");
            if (!shape) {
                shape = tool.Pool.getObject(egret.Shape);
                shape.x = target.x + target.width / 2;
                shape.y = target.y + target.height / 2;
                shape.name = "__drawProgress_shapeMask__";
                target.parent.addChild(shape);
                target.mask = shape;
            }
            var curAngle = startAngle + offAngle;
            var startAngle1 = startAngle * Math.PI / 180;
            var clear = function () {
                if (timeId > 0) {
                    egret.clearInterval(timeId);
                    timeId = 0;
                }
                if (shape && shape.name == "__drawProgress_shapeMask__") {
                    if (shape.parent)
                        shape.parent.removeChild(shape);
                    shape.name = null;
                    tool.Pool.releaseObject(shape);
                }
            };
            var update = function () {
                shape.graphics.clear();
                shape.graphics.beginFill(0x00ffff, 1);
                shape.graphics.lineTo(0, radius);
                if (isReverse) {
                    var tmp = (startAngle + 360) % 360;
                    tmp = tmp == 0 ? 360 : tmp;
                    shape.graphics.drawArc(0, 0, radius, curAngle * Math.PI / 180, tmp * Math.PI / 180);
                }
                else {
                    shape.graphics.drawArc(0, 0, radius, startAngle1, curAngle * Math.PI / 180);
                }
                shape.graphics.lineTo(0, 0);
                shape.graphics.endFill();
                var isRunning = true;
                if (upFn) {
                    if (args && args.length > 0) {
                        isRunning = upFn.apply(thisObj, [curAngle, time].concat(args));
                    }
                    else {
                        isRunning = upFn.apply(thisObj, [curAngle, time]);
                    }
                }
                curAngle = (curAngle + offAngle) % 360;
                time += offTime;
                if (!isRunning) {
                    clear();
                }
            };
            var timeId = 0;
            var time = offTime;
            if (offTime > 0) {
                timeId = egret.setInterval(update, thisObj, offTime);
            }
            else {
                update();
            }
            return clear;
        };
        return DrawUtils;
    }());
    tool.DrawUtils = DrawUtils;
    __reflect(DrawUtils.prototype, "tool.DrawUtils");
})(tool || (tool = {}));
var tool;
(function (tool) {
    var MathTool = (function () {
        function MathTool() {
        }
        /**快排
         * compareFunction 的结果可以具有负值、0 或正值：
         * 若返回值为负，则表示 A 在排序后的序列中出现在 B 之前。
         * 若返回值为 0，则表示 A 和 B 具有相同的排序顺序。
         * 若返回值为正，则表示 A 在排序后的序列中出现在 B 之后。
        */
        MathTool.quickSort = function (array, compareFn) {
            if (array == null || array.length <= 1)
                return;
            var mid = array[0];
            var i = 1;
            var head = 0;
            var tail = array.length - 1;
            var tmp;
            while (head < tail) {
                if (compareFn(mid, array[i]) < 0) {
                    //若返回值为负，则表示 mid 在排序后的序列中出现在 array[i] 之前。
                    tmp = array[i];
                    array[i] = array[tail];
                    array[tail] = tmp;
                    tail--;
                }
                else {
                    tmp = array[i];
                    array[i] = array[head];
                    array[head] = array[i];
                    head++;
                    i++;
                }
            }
            array[head] = mid;
            MathTool.quickSort(array.slice(0, head), compareFn);
            MathTool.quickSort(array.slice(head + 1, array.length), compareFn);
        };
        return MathTool;
    }());
    tool.MathTool = MathTool;
    __reflect(MathTool.prototype, "tool.MathTool");
})(tool || (tool = {}));
var tool;
(function (tool) {
    var PhoneUtils = (function () {
        function PhoneUtils() {
        }
        /**手机地理信息
         * @param thisObj this指向
         * @param upFn 更新信息，返回true 继续执行，反之clear
         * @param ...args 额外数据
         * @return 返回一个clear函数
        */
        PhoneUtils.shakePhone = function (thisObj, upFn) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!upFn)
                return;
            var orientation = tool.Pool.getObject(egret.DeviceOrientation);
            var clear = function () {
                if (orientation) {
                    orientation.removeEventListener(egret.Event.CHANGE, onorientationchange, thisObj);
                    orientation.stop();
                }
            };
            var onOrientation = function (e) {
                var isRunning = true;
                //x、y、z
                if (args)
                    isRunning = upFn.apply(thisObj, [e.beta, e.gamma, e.alpha].concat(args));
                else
                    isRunning = upFn.apply(thisObj, [e.beta, e.gamma, e.alpha]);
                if (!isRunning)
                    clear();
            };
            orientation.addEventListener(egret.Event.CHANGE, onOrientation, thisObj);
            orientation.start();
            return clear;
        };
        return PhoneUtils;
    }());
    tool.PhoneUtils = PhoneUtils;
    __reflect(PhoneUtils.prototype, "tool.PhoneUtils");
})(tool || (tool = {}));
var tool;
(function (tool) {
    var Pool = (function () {
        function Pool() {
            //私有构建
        }
        /**
         * 通过对象获取key
         * @param object 对象
         */
        Pool.getKeyByObj = function (object) {
            return object["__proto__"]["__class__"];
        };
        /**
         * 通过类名获取key
         * @param cls 类名
         */
        Pool.getKeyByCls = function (cls) {
            return cls.prototype.__class__;
        };
        /**
         * 对象池中获取一个对象
         * @param cls 类名
         */
        Pool.getObject = function (cls) {
            var key = Pool.getKeyByCls(cls);
            var pool = Pool.getPoolByKey(key);
            var object;
            if (pool.length > 0)
                object = pool.pop();
            else
                object = new cls();
            object[Pool.POOL_FLAG] = false;
            return object;
        };
        /**
         * 通过key获取对象池，cls用来构建类（这里暂时不考虑反射）
         * 提供这个方法是为了自定义key的使用
         * @param cls 类名
         */
        Pool.getObjectByKey = function (clsName) {
            var pool = Pool.getPoolByKey(clsName);
            var object;
            if (pool.length > 0)
                object = pool.pop();
            else {
                var cls = egret.getDefinitionByName(clsName);
                object = new cls();
            }
            object[Pool.POOL_FLAG] = false;
            return object;
        };
        /**
         * 将对象释放到对象池
         * @param object 类名
         */
        Pool.releaseObject = function (object) {
            var key = Pool.getKeyByObj(object);
            Pool.releaseObjectByKey(key, object);
        };
        /**
         * 将对象释放到对象池
         * 提供这个方法是为了自定义key的使用
         * @param object 类名
         */
        Pool.releaseObjectByKey = function (clsName, object) {
            var pool = Pool.getPoolByKey(clsName);
            object[Pool.POOL_FLAG] = true;
            pool.push(object);
        };
        /**
         * 将对象池删除
         * @param cls 类名
         */
        Pool.disposePool = function (cls) {
            var key = Pool.getKeyByCls(cls);
            Pool.disposePoolByKey(key);
        };
        /**
         * 将对象池删除
         * @param cls 类名
         */
        Pool.disposePoolByKey = function (key) {
            delete Pool._poolDic[key];
        };
        /**
         * 获取对象池
         * @param cls 类名
         */
        Pool.getPool = function (cls) {
            var key = Pool.getKeyByCls(cls);
            return Pool.getPoolByKey(key);
        };
        /**
         * 通过key获取对象池
         * @param cls 类名
         */
        Pool.getPoolByKey = function (key) {
            return Pool._poolDic[key] || (Pool._poolDic[key] = []);
        };
        Pool.POOL_FLAG = "__InPool";
        Pool._poolDic = {};
        return Pool;
    }());
    tool.Pool = Pool;
    __reflect(Pool.prototype, "tool.Pool");
})(tool || (tool = {}));
var tool;
(function (tool) {
    var UIUtils = (function () {
        function UIUtils() {
        }
        /**设置按钮点击效果
 * @param target 实现按钮效果的target
 * @param thisObj this的指向控制
 * @param touchFn 调用的函数
 * @return 返回clear
*/
        UIUtils.setBtnModel = function (target, thisObj, touchFn) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            if (!target || !target.stage)
                return;
            var update = function (model) {
                if (touchFn) {
                    if (args)
                        touchFn.apply(thisObj, [model].concat(args));
                    else
                        touchFn.apply(thisObj, [model]);
                }
            };
            var onTouchBegin = function (evt) {
                var stage = target.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);
                target.scaleY = 0.97 * cacheScaleY;
                target.scaleX = 0.99 * cacheScaleX;
                update("down");
            };
            var onTouchCancle = function (evt) {
                var stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);
                target.scaleY = cacheScaleY;
                target.scaleX = cacheScaleX;
                update("up");
            };
            var onStageTouchEnd = function (evt) {
                var stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);
                target.scaleY = cacheScaleY;
                target.scaleX = cacheScaleX;
                update("up");
            };
            var clear = function () {
                target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, thisObj);
                var stage = target.stage;
                stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancle, thisObj);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, onStageTouchEnd, thisObj);
                target.scaleX = cacheScaleX;
                target.scaleY = cacheScaleY;
            };
            var cacheScaleY = target.scaleY;
            var cacheScaleX = target.scaleX;
            clear();
            var dx = target.anchorOffsetX - target.width / 2;
            var dy = target.anchorOffsetY - target.height;
            target.x = target.x - dx;
            target.y = target.y - dy;
            target.anchorOffsetX = target.width / 2;
            target.anchorOffsetY = target.height;
            target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, thisObj);
            return clear;
        };
        /**滚动到对应index,显示规则：
         * 如果视窗只能显示2X2；index=1，显示[[1,2][4,5]];index=2,显示[[1,2][4,5]];index=11,显示[[7,8][10,11]]
         * list显示2行3列以rows方向增长
         * [[0,1,2]
         * 	[3,4,5]
         *  [6,7,8]
         *  [9,10,11]]
         * @param index 滚动到对应index
         * @param thisOb this的指向
         * @param caculeFn 如果需要额外计算偏移，则使用该方法；
         * @param args 额外参数
        */
        UIUtils.scrollTo = function (dataList, height, width, index, thisObj, caculateFn) {
            var args = [];
            for (var _i = 6; _i < arguments.length; _i++) {
                args[_i - 6] = arguments[_i];
            }
            if (!dataList)
                return;
            if (!dataList.dataProvider || index >= dataList.dataProvider.length)
                return;
            var scrollH = 0;
            var scrollV = 0;
            var itemWidth;
            var itemHeight;
            var tmp;
            if (dataList.layout instanceof eui.VerticalLayout) {
                itemHeight = dataList.layout.$typicalHeight + dataList.layout.gap;
                tmp = (dataList.dataProvider.length - 1 - index) * itemHeight;
                if (tmp > height) {
                    scrollV = index * itemHeight;
                }
                else {
                    scrollV = dataList.dataProvider.length * itemHeight - height;
                    scrollV = scrollV < 0 ? 0 : scrollV;
                }
            }
            else if (dataList.layout instanceof eui.HorizontalLayout) {
                itemWidth = dataList.layout.$typicalWidth + dataList.layout.gap;
                tmp = (dataList.dataProvider.length - 1 - index) * itemWidth;
                if (tmp > width) {
                    scrollH = index * itemWidth;
                }
                else {
                    scrollH = dataList.dataProvider.length * itemWidth - width;
                    scrollH = scrollH < 0 ? 0 : scrollH;
                }
            }
            else if (dataList.layout instanceof eui.TileLayout) {
                itemHeight = dataList.layout.$typicalHeight + dataList.layout.verticalGap;
                itemWidth = dataList.layout.$typicalWidth + dataList.layout.horizontalGap;
                var columnCount = dataList.layout.columnCount;
                var rowCount = dataList.layout.rowCount;
                var indexColumn = void 0;
                var indexRow = void 0;
                if (dataList.layout.orientation == "rows") {
                    indexColumn = index % dataList.layout.columnCount;
                    if ((dataList.layout.columnCount - indexColumn) * itemWidth > width) {
                        scrollH = indexColumn * itemWidth;
                    }
                    else {
                        scrollH = dataList.layout.columnCount * itemWidth - width;
                        scrollH = scrollH < 0 ? 0 : scrollH;
                    }
                    indexRow = Math.floor(index / dataList.layout.columnCount);
                    if (indexColumn == 0)
                        indexRow += 1;
                    if ((dataList.layout.rowCount - indexRow + 1) * itemHeight >= height) {
                        scrollV = (indexRow - 1) * itemHeight;
                    }
                    else {
                        scrollV = dataList.layout.rowCount * itemHeight - height;
                        scrollV = scrollV < 0 ? 0 : scrollV;
                    }
                }
                else if (dataList.layout.orientation == "columns") {
                    indexRow = index % dataList.layout.rowCount;
                    if ((dataList.layout.rowCount - indexRow) * itemHeight > height) {
                        scrollV = indexRow * itemHeight;
                    }
                    else {
                        scrollV = dataList.layout.rowCount * itemHeight - height;
                        scrollV = scrollV < 0 ? 0 : scrollV;
                    }
                    indexColumn = Math.floor(index / dataList.layout.rowCount);
                    if (indexRow == 0)
                        indexColumn += 1;
                    if ((dataList.layout.columnCount - indexColumn + 1) * itemWidth >= width) {
                        scrollH = (indexColumn - 1) * itemWidth;
                    }
                    else {
                        scrollH = dataList.layout.columnCount * itemWidth - width;
                        scrollH = scrollH < 0 ? 0 : scrollH;
                    }
                }
            }
            else {
                //???什么鬼
            }
            if (caculateFn) {
                var result = void 0;
                if (args)
                    result = caculateFn.apply(thisObj, [scrollH, scrollV].concat(args));
                else
                    result = caculateFn.apply(thisObj, [scrollH, scrollV]);
                dataList.scrollH = result.scrollH;
                dataList.scrollV = result.scrollV;
            }
            else {
                dataList.scrollH = scrollH;
                dataList.scrollV = scrollV;
            }
        };
        return UIUtils;
    }());
    tool.UIUtils = UIUtils;
    __reflect(UIUtils.prototype, "tool.UIUtils");
})(tool || (tool = {}));
var SimpleList = (function (_super) {
    __extends(SimpleList, _super);
    function SimpleList() {
        return _super.call(this) || this;
    }
    SimpleList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (partName == "dataList") {
            this.viewport = this.dataList;
        }
    };
    SimpleList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.allowMultipleSelection = false;
        this.setSingleScroll(false);
        this.dataList.once(egret.Event.RENDER, this.onRender, this);
    };
    SimpleList.prototype.onRender = function (event) {
        this._isRendered = true;
        if (this._renderHandler) {
            this._renderHandler.execute();
        }
    };
    SimpleList.prototype.onSelect = function (event) {
        var dataList = this.dataList;
        var selectHandler = this._selectHandler;
        if (selectHandler) {
            if (dataList.allowMultipleSelection) {
                selectHandler.execute([dataList.selectedIndices]);
            }
            else {
                selectHandler.execute([dataList.selectedIndex]);
            }
        }
    };
    /**list 的 egret.Event.RENDER 响应方法*/
    SimpleList.prototype.registerRender = function (render, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.removeRenderHandler();
        var handler = tool.Pool.getObject(Handler);
        handler.add(render, thisObj, args);
        this._renderHandler = handler;
        if (this._isRendered) {
            this.onRender();
        }
    };
    /**注册select监听*/
    SimpleList.prototype.registerSelect = function (select, thisObj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.removeSelectHandler();
        var handler = tool.Pool.getObject(Handler);
        handler.add(select, thisObj, args);
        this._selectHandler = handler;
        //添加监听
        if (!this.dataList.hasEventListener(eui.ItemTapEvent.ITEM_TAP)) {
            this.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
        }
    };
    /** 添加数据 默认使用ArrayCollection*/
    SimpleList.prototype.addData = function (data, isReplace) {
        if (isReplace === void 0) { isReplace = false; }
        var dataList = this.dataList;
        var arrayCollection = dataList.dataProvider;
        //判断是否替换原有数据
        //data非ArrayCollection
        if (!(data instanceof eui.ArrayCollection)) {
            if (isReplace && arrayCollection) {
                arrayCollection.removeAll();
            }
            //dataProvider是null
            if (!arrayCollection) {
                arrayCollection = new eui.ArrayCollection();
                dataList.dataProvider = arrayCollection;
            }
            //如果是数组，那么循环添加
            if (data instanceof Array) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var d = data_1[_i];
                    arrayCollection.addItem(d);
                }
            }
            else {
                arrayCollection.addItem(data);
            }
        }
        else {
            if (isReplace) {
                dataList.dataProvider = null;
                dataList.dataProvider = data;
            }
            else {
                if (!arrayCollection) {
                    arrayCollection = new eui.ArrayCollection();
                    dataList.dataProvider = arrayCollection;
                }
                for (var i = 0; i < data.length; i++) {
                    arrayCollection.addItem(data.getItemAt(i));
                }
            }
        }
    };
    /**滚动到对应index,显示规则：
     * 如果视窗只能显示2X2；index=1，显示[[1,2][4,5]];index=2,显示[[1,2][4,5]];index=11,显示[[7,8][10,11]]
     * list显示2行3列以rows方向增长
     * [[0,1,2]
     * 	[3,4,5]
     *  [6,7,8]
     *  [9,10,11]]
     * @param index 滚动到对应index
     * @param thisOb this的指向
     * @param caculeFn 如果需要额外计算偏移，则使用该方法；
     * @param args 额外参数
    */
    SimpleList.prototype.scrollTo = function (index, thisObj, caculateFn) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        (_a = tool.UIUtils).scrollTo.apply(_a, [this.dataList, this.height, this.width, index, thisObj, caculateFn].concat(args));
        var _a;
    };
    /**
     * 单向滚动
     * @param isScrollH 是否是水平方向
     * @param policy 滚动策略
    */
    SimpleList.prototype.setSingleScroll = function (isScrollH, policy) {
        if (policy === void 0) { policy = "auto"; }
        if (isScrollH) {
            this.scrollPolicyH = policy;
            this.scrollPolicyV = "off";
        }
        else {
            this.scrollPolicyH = "off";
            this.scrollPolicyV = policy;
        }
    };
    Object.defineProperty(SimpleList.prototype, "allowMultipleSelection", {
        get: function () {
            if (this.dataList)
                return this.dataList.allowMultipleSelection;
            return false;
        },
        /**是否可以多选*/
        set: function (value) {
            if (this.dataList)
                this.dataList.allowMultipleSelection = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleList.prototype, "itemRenderer", {
        /**用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口*/
        get: function () {
            if (this.dataList)
                return this.dataList.itemRenderer;
            return null;
        },
        /**用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口*/
        set: function (value) {
            if (this.dataList)
                this.dataList.itemRenderer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleList.prototype, "selectedIndex", {
        /**当前选中*/
        get: function () {
            if (this.dataList)
                return this.dataList.selectedIndex;
            return 0;
        },
        /**选中list item*/
        set: function (value) {
            if (!this.dataList || this.dataList.selectedIndex == value)
                return;
            this.dataList.selectedIndex = value;
            this.onSelect();
        },
        enumerable: true,
        configurable: true
    });
    SimpleList.prototype.dispose = function () {
        this.removeRenderHandler();
        this.removeSelectHandler();
    };
    SimpleList.prototype.removeRenderHandler = function () {
        if (this._renderHandler) {
            this._renderHandler.dispose();
            tool.Pool.releaseObject(this._renderHandler);
            this._renderHandler = null;
        }
    };
    SimpleList.prototype.removeSelectHandler = function () {
        if (this._selectHandler) {
            this._selectHandler.dispose();
            tool.Pool.releaseObject(this._selectHandler);
            this._selectHandler = null;
        }
    };
    return SimpleList;
}(eui.Scroller));
__reflect(SimpleList.prototype, "SimpleList", ["eui.UIComponent", "egret.DisplayObject"]);
var SimpleItemRenderer = (function (_super) {
    __extends(SimpleItemRenderer, _super);
    function SimpleItemRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SimpleItemRenderer.prototype, "selected", {
        set: function (value) {
            egret.superSetter(eui.ItemRenderer, this, "selected");
            if (this["select"]) {
                this["select"].visible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SimpleItemRenderer;
}(eui.ItemRenderer));
__reflect(SimpleItemRenderer.prototype, "SimpleItemRenderer");
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.add = function (method, thisObj, args) {
        this._method = method;
        this._thisObj = thisObj;
        this._args = args;
    };
    /**执行处理*/
    Handler.prototype.execute = function (data) {
        if (data == null)
            this._method.apply(this._thisObj, this._args);
        if (this._method)
            this._method.apply(this._thisObj, this._args ? data.concat(this._args) : data);
    };
    Handler.prototype.dispose = function () {
        this._method = null;
        this._args = null;
        this._thisObj = null;
    };
    Object.defineProperty(Handler.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Handler.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Handler.prototype, "thisObj", {
        get: function () {
            return this._thisObj;
        },
        enumerable: true,
        configurable: true
    });
    return Handler;
}());
__reflect(Handler.prototype, "Handler", ["IDispose"]);
var GameTime = (function () {
    function GameTime() {
    }
    return GameTime;
}());
__reflect(GameTime.prototype, "GameTime");
var CmpList = (function () {
    function CmpList() {
        this._cmpMap = {};
    }
    CmpList.prototype.addCmp = function (cls) {
        var self = this;
        var key = tool.Pool.getKeyByCls(cls);
        if (!!self._cmpMap[key])
            return;
        var t = tool.Pool.getObject(cls);
        self._cmpMap[key] = t;
        if (!!self.addFn)
            self.addFn.apply(self.thisObj, [t]);
    };
    CmpList.prototype.removeCmp1 = function (cls) {
        var self = this;
        var key = tool.Pool.getKeyByCls(cls);
        if (!self._cmpMap[key])
            return;
        var cmp = self._cmpMap[key];
        if (!!self.removeFn)
            self.removeFn.apply(self.thisObj, [cmp]);
        cmp.dispose();
        tool.Pool.releaseObject(cmp);
        delete self._cmpMap[key];
    };
    CmpList.prototype.removeCmp2 = function (t) {
        var self = this;
        var key = tool.Pool.getKeyByObj(t);
        if (!self._cmpMap[key])
            return;
        var cmp = self._cmpMap[key];
        if (!!self.removeFn)
            self.removeFn.apply(self.thisObj, [cmp]);
        cmp.dispose();
        tool.Pool.releaseObject(cmp);
        delete self._cmpMap[key];
    };
    CmpList.prototype.getCmp = function (cls) {
        return this._cmpMap[tool.Pool.getKeyByCls(cls)];
    };
    return CmpList;
}());
__reflect(CmpList.prototype, "CmpList");
var RedPointCmp = (function (_super) {
    __extends(RedPointCmp, _super);
    function RedPointCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedPointCmp.prototype.bind = function (skin) {
        _super.prototype.bind.call(this, skin);
        var self = this;
        var redPointCfg = skin.cfg_redPointCmp;
        if (redPointCfg) {
            for (var i = 0; i < redPointCfg.length; i++) {
                self.registerRedPoint(redPointCfg[i]);
            }
        }
    };
    RedPointCmp.prototype.update = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case "show":
                var redPointKeys = data ? data.redPointKeys : null;
                //红点显示
                self.updateRedPoint(redPointKeys);
                break;
            case "hide":
                //红点移除
                for (var key in self._redPointMap) {
                    var obj = self._redPointMap[key];
                    if (obj.redPoint) {
                        if (obj.redPoint.parent)
                            obj.redPoint.parent.removeChild(obj.redPoint);
                        tool.Pool.releaseObject(obj.redPoint);
                        delete obj.redPoint;
                    }
                }
                break;
            case "redPoint":
                self.updateRedPoint(data);
                break;
            case "dispose":
                self.dispose();
                break;
        }
    };
    /**注册红点
    */
    RedPointCmp.prototype.registerRedPoint = function (data) {
        var self = this;
        if (!self._redPointMap)
            self._redPointMap = {};
        self._redPointMap[data.key] = data;
    };
    /**更新红点
    */
    RedPointCmp.prototype.updateRedPoint = function (keys, isShow) {
        if (isShow === void 0) { isShow = true; }
        if (keys == null || keys == undefined)
            return;
        var self = this;
        if (typeof keys == "string") {
            self.showRedPoint(keys, isShow);
        }
        else {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                self.showRedPoint(key, isShow);
            }
        }
    };
    /**红点显示策略*/
    RedPointCmp.prototype.showRedPoint = function (key, isShow) {
        //优化策略:红点重用
        //1、当一个面板未关闭时，红点不会被移除，
        //	A.如果有新红点先遍历是否有不用的红点 有则显示并且调整坐标, 无则从对象池获取
        //2、当面板关闭时，移除所有红点
        var viewHitMap = this._redPointMap;
        if (!viewHitMap)
            return;
        var obj = viewHitMap[key];
        if (!obj || !obj.display || !obj.display.parent || !obj.display.visible)
            return;
        if (isShow) {
            var redPoint = void 0;
            for (var key_1 in viewHitMap) {
                var tmp = viewHitMap[key_1];
                if (!!tmp && !!tmp.redPoint && !tmp.redPoint.visible) {
                    redPoint = tmp.redPoint;
                    delete tmp.redPoint;
                    break;
                }
            }
            if (!redPoint) {
                redPoint = tool.Pool.getObject(eui.Image);
                redPoint.source = "redPoint_png";
                redPoint.touchEnabled = false;
                obj.display.parent.addChild(redPoint);
            }
            redPoint.visible = true;
            redPoint.x = obj.display.x + obj.offX;
            redPoint.y = obj.display.y + obj.offY;
        }
        else {
            if (obj.redPoint)
                obj.redPoint.visible = false;
        }
    };
    RedPointCmp.prototype.dispose = function () {
        var self = this;
        //移除红点
        if (self._redPointMap) {
            for (var key in self._redPointMap) {
                var obj = self._redPointMap[key];
                if (obj.redPoint) {
                    if (obj.redPoint.parent)
                        obj.redPoint.parent.removeChild(obj.redPoint);
                    tool.Pool.releaseObject(obj.redPoint);
                    delete obj.redPoint;
                }
            }
        }
    };
    return RedPointCmp;
}(UICmp));
__reflect(RedPointCmp.prototype, "RedPointCmp");
//=====红点组件================================================================ 
var TabCmp = (function (_super) {
    __extends(TabCmp, _super);
    function TabCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabCmp.prototype.bind = function (skin) {
        _super.prototype.bind.call(this, skin);
        this.tabs = skin.cfg_tabCmp;
    };
    Object.defineProperty(TabCmp.prototype, "tabs", {
        get: function () {
            return this._tabs;
        },
        set: function (value) {
            var self = this;
            if (!!value) {
                for (var _i = 0, _a = self.tabs; _i < _a.length; _i++) {
                    var data = _a[_i];
                    self.setEvt(data, true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TabCmp.prototype.setEvt = function (data, isAdd) {
        if (data == null)
            return;
        var self = this;
        if (isAdd) {
            data.tab.addEventListener(TTap, self.onTabSelect, this);
        }
        else {
            data.tab.removeEventListener(TTap, self.onTabSelect, this);
        }
    };
    TabCmp.prototype.onTabSelect = function (evt) {
        var self = this;
        if (self.selectFn == null) {
            return;
        }
        var tab = evt.currentTarget;
        for (var _i = 0, _a = self.tabs; _i < _a.length; _i++) {
            var data = _a[_i];
            if (tab == data.tab) {
                self.setPage(false);
                self._curData = data;
                self.setPage(true);
                self.selectFn.apply(self.skin, [data, true]);
            }
            else {
                self.selectFn.apply(self.skin, [data, false]);
            }
        }
    };
    TabCmp.prototype.setPage = function (isAdd) {
        var self = this;
        if (self._curData == null)
            return;
        var container = self._curData.container;
        if (container == null)
            container = self._curData.tab.parent;
        var page = self._curData.page;
        if (page == null)
            return;
        if (isAdd) {
            if (page instanceof egret.DisplayObject) {
            }
            else {
                page = tool.Pool.getObject(self._curData.page);
                self._curData.page = page;
            }
            if (page.parent == null)
                container.addChild(page);
            page.visible = true;
        }
        else {
            //到底是visible设置成false
            //还是removeChild 有待考证
            if (page instanceof egret.DisplayObject)
                page.visible = false;
        }
    };
    TabCmp.prototype.disposeTabs = function () {
        var self = this;
        if (!!self.tabs) {
            for (var _i = 0, _a = self.tabs; _i < _a.length; _i++) {
                var data = _a[_i];
                if (!data.page[tool.Pool.POOL_FLAG])
                    tool.Pool.releaseObject(data.page);
                self.setEvt(data, false);
            }
        }
        self.tabs = null;
    };
    TabCmp.prototype.dispose = function () {
        this.selectFn = null;
    };
    return TabCmp;
}(UICmp));
__reflect(TabCmp.prototype, "TabCmp");
//=====tab组件================================================================= 
var TouchCache = (function () {
    function TouchCache() {
    }
    TouchCache.prototype.addEvt = function (onTBegin, thisObj) {
        var self = this;
        if (!self._isAddEvent) {
            self._target.addEventListener(TBegin, onTBegin, thisObj);
        }
        self._isAddEvent = true;
    };
    TouchCache.prototype.removeEvt = function (onTBegin, thisObj) {
        var self = this;
        if (self._isAddEvent) {
            self._target.removeEventListener(TBegin, onTBegin, thisObj);
        }
        self._isAddEvent = false;
    };
    Object.defineProperty(TouchCache.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            if (this._target == value)
                return;
            this._target = value;
            if (!value)
                return;
            //暂存缩放，防止该display之前就有缩放
            this._scaleX = value.scaleX;
            this._scaleY = value.scaleY;
            //重置注册点
            var dx = value.anchorOffsetX - value.width / 2;
            var dy = value.anchorOffsetY - value.height;
            value.x = value.x - dx;
            value.y = value.y - dy;
            value.anchorOffsetX = value.width / 2;
            value.anchorOffsetY = value.height;
            this.isTouch = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchCache.prototype, "isTouch", {
        get: function () {
            return this._isTouch;
        },
        set: function (value) {
            var self = this;
            self._isTouch = value;
            if (!self.target)
                return;
            if (value) {
                self.target.scaleY = 0.97 * self._scaleY;
                self.target.scaleX = 0.99 * self._scaleX;
            }
            else {
                self.target.scaleY = self._scaleY;
                self.target.scaleX = self._scaleX;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**移除handler : SHORT | LONG*/
    TouchCache.prototype.removeHandler = function (property) {
        var handler = this[property];
        if (!handler)
            return;
        handler.dispose();
        tool.Pool.releaseObject(handler);
        this[property] = null;
    };
    TouchCache.prototype.dispose = function () {
        var self = this;
        self.target = null;
        self.isTouch = false;
        self.removeHandler(TouchCache.SHORT);
        self.removeHandler(TouchCache.LONG);
    };
    TouchCache.SHORT = "short";
    TouchCache.LONG = "long";
    return TouchCache;
}());
__reflect(TouchCache.prototype, "TouchCache", ["IDispose"]);
var STouchCmp = (function (_super) {
    __extends(STouchCmp, _super);
    function STouchCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    STouchCmp.prototype.bind = function (skin) {
        _super.prototype.bind.call(this, skin);
        this.touchHandlerMap = skin.cfg_touchCmp;
    };
    STouchCmp.prototype.update = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case "show":
                for (var key in self.touchHandlerMap) {
                    self.touchHandlerMap[key].target.addEventListener(TBegin, self.onTBegin, self.skin);
                }
                break;
            case "close":
                //移除点击
                for (var key in self.touchHandlerMap) {
                    self.touchHandlerMap[key].target.removeEventListener(TBegin, self.onTBegin, self.skin);
                }
                break;
            case "dispose":
                self.dispose();
                break;
            case TEnd:
                self.onTEnd();
                break;
            case TCancel:
                self.onTEnd();
                break;
        }
    };
    /**开始响应点击*/
    STouchCmp.prototype.onTBegin = function (evt) {
        var obj = this.touchHandlerMap[evt.currentTarget.hashCode];
        obj.isTouch = true;
    };
    /**点击结束*/
    STouchCmp.prototype.onTEnd = function () {
        var self = this;
        for (var key in self.touchHandlerMap) {
            self.touchHandlerMap[key].isTouch = false;
        }
    };
    /**添加点击*/
    STouchCmp.prototype.add = function (target, touchFn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.add1(TouchCache.SHORT, target, touchFn, args);
    };
    STouchCmp.prototype.add1 = function (key, target, touchFn, args) {
        var self = this;
        //设置点击
        var handler = tool.Pool.getObject(Handler);
        handler.add(touchFn, self.skin, args);
        var touchHandleMap = self.touchHandlerMap;
        if (touchHandleMap[target.hashCode]) {
            touchHandleMap[target.hashCode][key] = handler;
        }
        else {
            var touchCache = tool.Pool.getObject(TouchCache);
            touchCache.target = target;
            touchCache[key] = handler;
            touchHandleMap[target.hashCode] = touchCache;
        }
    };
    /**移除点击*/
    STouchCmp.prototype.remove = function (target) {
        this.remove1(TouchCache.SHORT, target);
    };
    STouchCmp.prototype.remove1 = function (key, target) {
        var self = this;
        if (!self.touchHandlerMap || !self.touchHandlerMap[target.hashCode])
            return;
        var obj = self.touchHandlerMap[target.hashCode];
        obj.removeHandler(key);
        if (!obj.short && !obj.long) {
            target.removeEventListener(TBegin, self.onTBegin, self);
            obj.dispose();
            tool.Pool.releaseObject(obj);
            delete self.touchHandlerMap[target.hashCode];
        }
    };
    STouchCmp.prototype.dispose = function () {
        var self = this;
        //移除点击事件
        if (self.touchHandlerMap) {
            for (var key in self.touchHandlerMap) {
                var obj = self.touchHandlerMap[key];
                obj.dispose();
                tool.Pool.releaseObject(obj);
                delete self.touchHandlerMap[key];
            }
        }
    };
    return STouchCmp;
}(UICmp));
__reflect(STouchCmp.prototype, "STouchCmp");
/**长点击*/
var LTouchCmp = (function (_super) {
    __extends(LTouchCmp, _super);
    function LTouchCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LTouchCmp.prototype.bind = function (skin) {
        _super.prototype.bind.call(this, skin);
        this.touchHandlerMap = skin.touchMap;
    };
    /**开始响应点击*/
    LTouchCmp.prototype.onTBegin = function (evt) {
        var self = this;
        var obj = self.touchHandlerMap[evt.currentTarget.hashCode];
        obj.isTouch = true;
        self.clearStartTimeId();
        self.clearTimeId();
        if (obj.long) {
            self._touchStartTimeId = egret.setTimeout(self.startTimeId, this, LTouchCmp.START_LONGTOUCH, obj);
        }
    };
    /**点击结束*/
    LTouchCmp.prototype.onTEnd = function () {
        var self = this;
        self.clearStartTimeId();
        self.clearTimeId();
        for (var key in self.touchHandlerMap) {
            var obj = self.touchHandlerMap[key];
            obj.isTouch = false;
        }
    };
    /**添加点击*/
    LTouchCmp.prototype.add = function (target, touchFn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.add1(TouchCache.LONG, target, touchFn, args);
    };
    /**移除点击*/
    LTouchCmp.prototype.remove = function (target) {
        this.remove1(TouchCache.LONG, target);
    };
    /**开启长点击 tick*/
    LTouchCmp.prototype.startTimeId = function (obj) {
        var self = this;
        self.clearStartTimeId();
        self._touchTimeId = egret.setInterval(self.onTouchTick, this, LTouchCmp.SPACE_LONGTOUCH, obj);
    };
    /**触发长点击 ---> SPACE_LONGTOUCH*/
    LTouchCmp.prototype.onTouchTick = function (obj) {
        obj.long.execute([LTouchCmp.SPACE_LONGTOUCH]);
    };
    /**多少毫秒之后触发 ---> _touchStartTimeId + START_LONGTOUCH*/
    LTouchCmp.prototype.clearStartTimeId = function () {
        if (this._touchStartTimeId > 0) {
            egret.clearTimeout(this._touchStartTimeId);
            this._touchStartTimeId = 0;
        }
    };
    /**触发长点击 ---> _touchTimeId + SPACE_LONGTOUCH*/
    LTouchCmp.prototype.clearTimeId = function () {
        if (this._touchTimeId > 0) {
            egret.clearInterval(this._touchTimeId);
            this._touchTimeId = 0;
        }
    };
    LTouchCmp.prototype.dispose = function () {
        var self = this;
        _super.prototype.dispose.call(this);
        //清除计时器
        self.clearStartTimeId();
        self.clearTimeId();
    };
    /**开启长点击*/
    LTouchCmp.START_LONGTOUCH = 1000;
    /**间隔多少调用一次点击事件*/
    LTouchCmp.SPACE_LONGTOUCH = 500;
    return LTouchCmp;
}(STouchCmp));
__reflect(LTouchCmp.prototype, "LTouchCmp");
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction || (Direction = {}));
var CloseMenuCmp = (function (_super) {
    __extends(CloseMenuCmp, _super);
    function CloseMenuCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloseMenuCmp.prototype.run = function (direction, cbkFn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var self = this;
        if (!!cbkFn) {
            self._handler = tool.Pool.getObject(Handler);
            self._handler.add(cbkFn, self.skin, args);
        }
        switch (direction) {
            case Direction.up:
                break;
            case Direction.down:
                break;
            case Direction.left:
                break;
            case Direction.right:
                break;
        }
    };
    CloseMenuCmp.prototype.stop = function () {
    };
    return CloseMenuCmp;
}(UICmp));
__reflect(CloseMenuCmp.prototype, "CloseMenuCmp");
/////改文件意在减少字符串长度/////
/**别名：egret.TouchEvent.TOUCH_BEGIN*/
var TBegin = egret.TouchEvent.TOUCH_BEGIN;
/**别名：egret.TouchEvent.TOUCH_CANCEL*/
var TCancel = egret.TouchEvent.TOUCH_CANCEL;
/**别名：egret.TouchEvent.TOUCH_END*/
var TEnd = egret.TouchEvent.TOUCH_END;
/**别名：egret.TouchEvent.TOUCH_MOVE*/
var TMove = egret.TouchEvent.TOUCH_MOVE;
/**别名：egret.TouchEvent.TOUCH_RELEASE_OUTSIDE*/
var TROutside = egret.TouchEvent.TOUCH_RELEASE_OUTSIDE;
/**别名：egret.TouchEvent.TOUCH_TAP*/
var TTap = egret.TouchEvent.TOUCH_TAP;
var GameLayer = (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GameLayer;
}(egret.DisplayObjectContainer));
__reflect(GameLayer.prototype, "GameLayer");
var MainLayer = (function (_super) {
    __extends(MainLayer, _super);
    function MainLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MainLayer;
}(egret.DisplayObjectContainer));
__reflect(MainLayer.prototype, "MainLayer");
/**游戏 配置、运行参数*/
var System = (function () {
    function System() {
    }
    System.Inst = new System();
    return System;
}());
__reflect(System.prototype, "System");
var World = (function () {
    function World() {
    }
    World.prototype.init = function (data) {
        var self = this;
        self._stage = data;
        self._updateCmps = [];
        self._cmpDic = new CmpList();
        self._cmpDic.thisObj = this;
        self._cmpDic.addFn = self.onCmpAdded;
        self._cmpDic.removeFn = self.onCmpRemoved;
        self.swapGameState(GameState);
    };
    World.prototype.update = function (cmd, data) {
    };
    World.prototype.swapGameState = function (cls) {
        var self = this;
        if (tool.Pool.getKeyByCls(cls) == tool.Pool.getKeyByObj(self._gameState)) {
            return;
        }
        if (!!self._gameState) {
            self._gameState.disEnter();
            tool.Pool.releaseObject(self._gameState);
        }
        self._gameState = tool.Pool.getObject(cls);
        self._gameState.enter();
    };
    World.prototype.addCmp = function (cls) {
        this._cmpDic.addCmp(cls);
    };
    World.prototype.removeCmp = function (cls, isDelete) {
        if (isDelete === void 0) { isDelete = false; }
        var self = this;
        if (isDelete) {
            self._cmpDic.removeCmp1(cls);
        }
        else {
            self.onCmpRemoved(self._cmpDic.getCmp(cls));
        }
    };
    World.prototype.getCmp = function (cls) {
        return this._cmpDic.getCmp(cls);
    };
    World.prototype.onCmpAdded = function (cmp) {
        var self = this;
        self._updateCmps.push(cmp);
    };
    World.prototype.onCmpRemoved = function (cmp) {
        var self = this;
        var index = self._updateCmps.indexOf(cmp);
        if (index >= 0) {
            self._updateCmps.splice(index, 1);
        }
    };
    Object.defineProperty(World.prototype, "gameTime", {
        get: function () {
            return this._gameState.gameTime;
        },
        enumerable: true,
        configurable: true
    });
    World.Inst = new World();
    return World;
}());
__reflect(World.prototype, "World");
var StateBase = (function () {
    function StateBase() {
    }
    return StateBase;
}());
__reflect(StateBase.prototype, "StateBase");
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameState.prototype.enter = function () {
        var self = this;
        World.Inst.addCmp(Zone);
        World.Inst.addCmp(Hud);
        World.Inst.addCmp(PlayerControl);
        self.gameTime = new GameTime();
    };
    GameState.prototype.disEnter = function () {
        World.Inst.removeCmp(Zone);
        World.Inst.removeCmp(Hud);
        World.Inst.removeCmp(PlayerControl);
    };
    return GameState;
}(StateBase));
__reflect(GameState.prototype, "GameState");
var PlayerControl = (function () {
    function PlayerControl() {
    }
    PlayerControl.prototype.bind = function (data) {
    };
    PlayerControl.prototype.update = function (cmd, data) {
    };
    PlayerControl.prototype.dispose = function () {
    };
    return PlayerControl;
}());
__reflect(PlayerControl.prototype, "PlayerControl", ["ICmp", "IUpdate", "IDispose"]);
var Hud = (function () {
    function Hud() {
    }
    Hud.prototype.bind = function (data) {
    };
    Hud.prototype.update = function (cmd, data) {
    };
    Hud.prototype.dispose = function () {
    };
    return Hud;
}());
__reflect(Hud.prototype, "Hud", ["ICmp", "IUpdate", "IDispose"]);
var Zone = (function () {
    function Zone() {
    }
    Zone.prototype.bind = function (data) {
    };
    Zone.prototype.update = function (cmd, data) {
    };
    Zone.prototype.dispose = function () {
    };
    return Zone;
}());
__reflect(Zone.prototype, "Zone", ["ICmp", "IUpdate", "IDispose"]);
var PluginManager = (function () {
    function PluginManager() {
    }
    PluginManager.Inst = new PluginManager();
    return PluginManager;
}());
__reflect(PluginManager.prototype, "PluginManager");
;window.Main = Main;