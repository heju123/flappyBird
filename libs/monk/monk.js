/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by heju on 2017/7/25.
 */
var globalUtil = {};
exports.default = globalUtil;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by heju on 2017/7/14.
 */
var commonUtil = {
    asyncLoadedScripts: {},
    asyncLoadedScriptsCallbackQueue: {},
    getScriptDomFromUrl: function getScriptDomFromUrl(url) {
        var dom = void 0;
        if (/.+\.js$/.test(url)) {
            dom = document.createElement("SCRIPT");
            dom.setAttribute("type", "text/javascript");
            dom.setAttribute("src", url);
        } else if (/.+\.css$/.test(url)) {
            dom = document.createElement('link');
            dom.href = url;
            dom.type = "text/css";
            dom.rel = "stylesheet";
        }
        return dom;
    },
    /**
     * 异步加载script或css
     */
    asyncLoadScript: function asyncLoadScript(url, callback) {
        var $this = commonUtil;
        if ($this.asyncLoadedScripts[url] != undefined) //已加载script标签
            {
                if (callback && typeof callback == "function") {
                    if ($this.asyncLoadedScripts[url] == 0) //未执行首个script标签的回调
                        {
                            if (!$this.asyncLoadedScriptsCallbackQueue[url]) {
                                $this.asyncLoadedScriptsCallbackQueue[url] = [];
                            }
                            $this.asyncLoadedScriptsCallbackQueue[url].push(callback);
                        } else {
                        callback.apply($this, []);
                    }
                }
                return;
            }
        $this.asyncLoadedScripts[url] = 0;
        var scriptDom = $this.getScriptDomFromUrl(url);
        if (scriptDom.readyState) {
            scriptDom.onreadystatechange = function () {
                if (scriptDom.readyState == "loaded" || scriptDom.readyState == "complete") {
                    scriptDom.onreadystatechange = null;
                    $this.asyncLoadedScripts[url] = 1;
                    if (callback && typeof callback == "function") {
                        callback.apply($this, []);
                    }
                    if ($this.asyncLoadedScriptsCallbackQueue[url]) {
                        for (var i = 0, j = $this.asyncLoadedScriptsCallbackQueue[url].length; i < j; i++) {
                            $this.asyncLoadedScriptsCallbackQueue[url][i].apply($this, []);
                        }
                        $this.asyncLoadedScriptsCallbackQueue[url] = undefined;
                    }
                }
            };
        } else {
            scriptDom.onload = function () {
                $this.asyncLoadedScripts[url] = 1;
                if (callback && typeof callback == "function") {
                    callback.apply($this, []);
                }
                if ($this.asyncLoadedScriptsCallbackQueue[url]) {
                    for (var i = 0, j = $this.asyncLoadedScriptsCallbackQueue[url].length; i < j; i++) {
                        $this.asyncLoadedScriptsCallbackQueue[url][i].apply($this, []);
                    }
                    $this.asyncLoadedScriptsCallbackQueue[url] = undefined;
                }
            };
        }
        document.getElementsByTagName('head')[0].appendChild(scriptDom);
    },
    concatList: function concatList(list, addList) {
        addList.forEach(function (item) {
            list.push(item);
        });
    },
    isEmptyObj: function isEmptyObj(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    },
    /**
     * 复制对象
     * @param obj 待复制的对象
     * @param dest 复制到目标对象
     * @param override 是否覆盖属性，false:如果dest存在相同不为空的属性，则不做复制操作，true:只复制obj不为空的属性
     * @return 复制的目标对象
     */
    copyObject: function copyObject(obj, dest, override) {
        if (override == undefined) {
            override = true;
        }
        var result = dest || {};
        for (var key in obj) {
            if (!override && result[key]) {
                continue;
            } else {
                if (!obj[key] && obj[key] != 0) {
                    continue;
                }
                result[key] = obj[key];
            }
        }
        return result;
    },
    copyArray: function copyArray(obj) {
        var result = [];
        for (var i = 0, j = obj.length; i < j; i++) {
            if (_typeof(obj[i]) == "object") {
                result[i] = commonUtil.copyObject(obj[i]);
            } else {
                result[i] = obj[i];
            }
        }
        return result;
    },
    /**
     * 用key值获取数组
     * @param arr 数组
     * @param key 字段名
     * @param value key字段值
     * @return 数组信息
     */
    getArrayInfoByKey: function getArrayInfoByKey(arr, key, value) {
        var item = void 0;
        for (var i = 0, j = arr.length; i < j; i++) {
            item = arr[i];
            if (item[key] === value) {
                return item;
            }
        }
        return undefined;
    },
    /**
     * 判断对象是否在数组中
     * @param arr
     * @param object
     */
    inArray: function inArray(arr, object) {
        if (arr == undefined || object == undefined) {
            return false;
        }
        var item = void 0;
        for (var i = 0, j = arr.length; i < j; i++) {
            item = arr[i];
            if (item === object) {
                return true;
            }
        }
        return false;
    }
};
exports.default = commonUtil;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Rect = function (_Component) {
    _inherits(Rect, _Component);

    function Rect(parent) {
        _classCallCheck(this, Rect);

        return _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, parent));
    }

    _createClass(Rect, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            _get(Rect.prototype.__proto__ || Object.getPrototypeOf(Rect.prototype), "initCfg", this).call(this, cfg);
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            var _this2 = this;

            if (!_get(Rect.prototype.__proto__ || Object.getPrototypeOf(Rect.prototype), "draw", this).call(this, ctx)) {
                return false;
            }
            ctx.save();
            if (this.style.borderRadius) {
                this.setRadiusClip(ctx, this.style.borderRadius);
            }
            this.setParentClip(ctx);
            ctx.beginPath();
            this.setCommonStyle(ctx);

            if (this.style.backgroundColor) {
                ctx.fillStyle = this.style.backgroundColor;
                ctx.rect(this.getRealX(), this.getRealY(), this.getWidth(), this.getHeight());
                ctx.fill();
            }
            if (this.style.backgroundImage && this.backgroundImageDom) {
                if (this.style.backgroundImageClip) {
                    ctx.drawImage(this.backgroundImageDom, this.style.backgroundImageClip[0], this.style.backgroundImageClip[1], this.style.backgroundImageClip[2], this.style.backgroundImageClip[3], this.getRealX(), this.getRealY(), this.getWidth(), this.getHeight());
                } else {
                    ctx.drawImage(this.backgroundImageDom, this.getRealX(), this.getRealY(), this.getWidth(), this.getHeight());
                }
            }
            if (this.style.borderWidth) {
                ctx.beginPath();
                var bcolor = this.style.borderColor || this.style.backgroundColor;
                ctx.lineWidth = this.style.borderWidth;
                ctx.strokeStyle = bcolor;
                if (this.style.borderRadius) {
                    this.getRectRadiusPath(ctx, this.style.borderRadius, -this.style.borderWidth / 2);
                } else {
                    ctx.rect(this.getRealX() + this.style.borderWidth / 2, this.getRealY() + this.style.borderWidth / 2, this.getWidth() - this.style.borderWidth, this.getHeight() - this.style.borderWidth);
                }
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();

            //绘制文字
            ctx.save();
            this.setClip(ctx);
            ctx.beginPath();
            this.setCommonStyle(ctx);
            if (this.text && this.text.length > 0) {
                ctx.font = this.style.fontSize + " " + this.style.fontFamily;
                ctx.textBaseline = "hanging";
                this.text.forEach(function (row, index) {
                    row.forEach(function (char, cindex) {
                        ctx.fillText(char, _this2.getTextRealX() + cindex * parseInt(_this2.style.fontSize, 10), _this2.getTextRealY() + _this2.style.lineHeight / 2 - parseInt(_this2.style.fontSize, 10) / 2 + _this2.style.lineHeight * index);
                    });
                });
            }
            ctx.restore();

            return true;
        }

        /** 设置后避免超出parent范围 */

    }, {
        key: "setParentClip",
        value: function setParentClip(ctx) {
            if (this.parent) {
                ctx.rect(this.getRealXRecursion(this.parent), this.getRealYRecursion(this.parent), this.parent.getWidth(), this.parent.getHeight());
                ctx.clip();
            }
        }
        /** 设置后避免超出当前组件范围 */

    }, {
        key: "setClip",
        value: function setClip(ctx) {
            ctx.rect(this.getRealX(), this.getRealY(), this.getWidth(), this.getHeight());
            ctx.clip();
        }
        /**
         * 获取圆角矩形路径
         *
         * @param radius 圆角半径
         * @param padding 整体扩大的像素
         */

    }, {
        key: "getRectRadiusPath",
        value: function getRectRadiusPath(ctx, radius, padding) {
            padding = padding || 0;
            var x = this.getRealX() - padding;
            var y = this.getRealY() - padding;
            var width = this.getWidth() + padding * 2;
            var height = this.getHeight() + padding * 2;
            radius += padding;
            ctx.moveTo(x + radius + padding, y);
            ctx.lineTo(x + width - radius - padding, y);
            ctx.arcTo(x + width, y, x + width, y + radius + padding, radius);
            ctx.lineTo(x + width, y + height - radius - padding);
            ctx.arcTo(x + width, y + height, x + width - radius - padding, y + height, radius);
            ctx.lineTo(x + radius + padding, y + height);
            ctx.arcTo(x, y + height, x, y + height - radius - padding, radius);
            ctx.lineTo(x, y + radius + padding);
            ctx.arcTo(x, y, x + radius + padding, y, radius);
        }
        /**
         * 设置后可以绘出圆角矩形
         *
         * @param radius 圆角半径
         */

    }, {
        key: "setRadiusClip",
        value: function setRadiusClip(ctx, radius) {
            //必须完全包含在父组件下才能实现圆角，因为不能连续两次执行clip，是目前的一个缺陷
            if (this.getRealXRecursion(this.parent) + this.parent.getWidth() >= this.getRealX() + this.getWidth() && this.getRealXRecursion(this.parent) <= this.getRealX() && this.getRealYRecursion(this.parent) + this.parent.getHeight() >= this.getRealY() + this.getHeight() && this.getRealYRecursion(this.parent) <= this.getRealY()) {
                this.getRectRadiusPath(ctx, radius);
                ctx.clip();
            }
        }

        /**
         * 是否在parent区域内
         *
         * @return -1：无parent；0：不在范围内；1：在范围内
         */

    }, {
        key: "inParentArea",
        value: function inParentArea(com) {
            if (!com.parent) {
                return -1;
            } else {
                if (this.getRealXRecursion(com.parent) + com.parent.getWidth() < this.getRealX() || this.getRealXRecursion(com.parent) > this.getRealX() + com.getWidth() || this.getRealYRecursion(com.parent) + com.parent.getHeight() < this.getRealY() || this.getRealYRecursion(com.parent) > this.getRealY() + com.getHeight()) //不在parent范围内
                    {
                        return 0;
                    } else {
                    return 1;
                }
            }
        }

        /**
         * 判断鼠标坐标是否在控件范围内
         *
         * @param px 鼠标x
         * @param py 鼠标y
         * @return true：在范围内
         */

    }, {
        key: "isPointInComponent",
        value: function isPointInComponent(px, py) {
            if (px >= this.getRealX(this) && px <= this.getRealX(this) + this.getWidth() && py >= this.getRealY(this) && py <= this.getRealY(this) + this.getHeight()) {
                return true;
            } else {
                return false;
            }
        }
    }]);

    return Rect;
}(_component2.default);

exports.default = Rect;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by heju on 2017/7/25.
 */
var Event = function () {
    function Event(type) {
        _classCallCheck(this, Event);

        this.type = type;
        this.propagation = true;
        this.immediatePropagation = true;
    }

    _createClass(Event, [{
        key: "setTarget",
        value: function setTarget(target) {
            this.target = target;
        }
    }, {
        key: "setCurrentTarget",
        value: function setCurrentTarget(target) {
            this.currentTarget = target;
        }
    }, {
        key: "stopPropagation",
        value: function stopPropagation() {
            this.propagation = false;
        }
    }, {
        key: "stopImmediatePropagation",
        value: function stopImmediatePropagation() {
            this.immediatePropagation = false;
        }
    }]);

    return Event;
}();

exports.default = Event;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rect = __webpack_require__(2);

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/20.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Panel = function (_Rect) {
    _inherits(Panel, _Rect);

    function Panel(parent) {
        _classCallCheck(this, Panel);

        return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, parent));
    }

    _createClass(Panel, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            if (cfg.controller && typeof cfg.controller == "function") {
                this.controller = new cfg.controller(this);
            }
            _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "initCfg", this).call(this, cfg);
            if (cfg.children) {
                this.initChildrenCfg(cfg.children);
            }
        }
    }, {
        key: "appendChildren",
        value: function appendChildren(child) {
            _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "appendChildren", this).call(this, child);

            this.doLayout();
        }

        /** 获取所有的权值 */

    }, {
        key: "getAllWeight",
        value: function getAllWeight() {
            var allWeight = 0;
            this.children.forEach(function (child, index) {
                if (child.style.layout && child.style.layout.layoutWeight) {
                    allWeight += child.style.layout.layoutWeight;
                } else {
                    allWeight += 1;
                }
            });
            return allWeight;
        }
    }, {
        key: "doLayout",
        value: function doLayout() {
            var _this2 = this;

            if (this.style.layout && this.style.layout.type && this.children.length > 0) {
                switch (this.style.layout.type) {
                    case "linearLayout":
                        var allWeight = this.getAllWeight(); //总权值
                        var allWH = 0; //记录高宽，确定x和y坐标
                        this.children.forEach(function (child, index) {
                            var weight = 1;
                            if (child.style.layout && child.style.layout.layoutWeight) {
                                weight = child.style.layout.layoutWeight;
                            }
                            if (!_this2.style.layout.orientation || _this2.style.layout.orientation === "horizontal") {
                                var width = (_this2.getWidth() - (_this2.style.borderWidth || 0) * 2) * (weight / allWeight);
                                child.style.x = allWH;
                                child.style.y = 0;
                                child.setWidth(width);
                                allWH += width;
                            } else if (_this2.style.layout.orientation === "vertical") {
                                var height = (_this2.getHeight() - (_this2.style.borderWidth || 0) * 2) * (weight / allWeight);
                                child.style.y = allWH;
                                child.style.x = 0;
                                child.setHeight(height);
                                allWH += height;
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }]);

    return Panel;
}(_rect2.default);

exports.default = Panel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by heju on 2017/7/20.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _panel = __webpack_require__(4);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component(parent) {
        _classCallCheck(this, Component);

        this.parent = parent;
        this.eventNotifys = []; //事件通知队列
        this.active = true; //为false则不绘制
        this.style = {};
        this.originalStyle = {}; //保存原来的样式，避免focus或hover后原来的样式丢失

        this.style.fontFamily = _globalUtil2.default.viewState.defaultFontFamily;
        this.style.fontSize = _globalUtil2.default.viewState.defaultFontSize;
        this.style.lineHeight = parseInt(this.style.fontSize, 10);
        this.multiLine = true; //是否多行文本
        this.autoLine = true; //是否自动换行
    }

    _createClass(Component, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            var $this = this;
            if (cfg.id) {
                this.id = cfg.id;
            }
            if (cfg.style) {
                _commonUtil2.default.copyObject(cfg.style, this.style, true);
            }
            this.text = this.getTextForRows(cfg.text);
            this.multiLine = cfg.multiLine || this.multiLine;

            if (this.style.backgroundImage) {
                var img = new Image();
                img.onload = function () {
                    $this.backgroundImageDom = this;
                    if (!$this.getWidth() || $this.getWidth() === "auto") {
                        $this.setWidth($this.backgroundImageDom.width);
                    }
                    if (!$this.getHeight() || $this.getHeight() === "auto") {
                        $this.setHeight($this.backgroundImageDom.height);
                    }
                };
                img.src = this.style.backgroundImage;
            }

            //事件绑定配置
            if (cfg.events) {
                var eventInfo = void 0;
                var funName = void 0;
                var param = void 0;
                var controller = void 0;
                for (var type in cfg.events) {
                    eventInfo = cfg.events[type];
                    if ((typeof eventInfo === "undefined" ? "undefined" : _typeof(eventInfo)) == "object") {
                        funName = eventInfo.callback;
                        if (eventInfo.param) //有参数
                            {
                                param = eventInfo.param.apply(this, [this]);
                            }
                    } else {
                        funName = eventInfo;
                    }
                    controller = this.getController(this);
                    if (controller && controller[funName] && typeof controller[funName] == "function") {
                        if (param) {
                            this.registerEvent(type, controller[funName].bind(controller, param));
                        } else {
                            this.registerEvent(type, controller[funName].bind(controller));
                        }
                    }
                }
            }
        }
    }, {
        key: "initChildrenCfg",
        value: function initChildrenCfg(childrenCfg) {
            this.children = [];
            if ((typeof childrenCfg === "undefined" ? "undefined" : _typeof(childrenCfg)) == "object" && childrenCfg instanceof Array) {
                var chiCfg = void 0;
                for (var i = 0, j = childrenCfg.length; i < j; i++) {
                    chiCfg = childrenCfg[i];
                    this.produceChildren(chiCfg);
                }
            } else {
                this.produceChildren(childrenCfg);
            }
        }
    }, {
        key: "produceChildren",
        value: function produceChildren(chiCfg) {
            var Rect = __webpack_require__(2).default;
            var Input = __webpack_require__(6).default;
            var Button = __webpack_require__(10).default;

            var childCom = void 0;
            if (typeof chiCfg === "function") //异步加载view
                {
                    return chiCfg(this.asyncGetView.bind(this));
                } else {
                switch (chiCfg.type) {
                    case "panel":
                        childCom = new _panel2.default(this);
                        childCom.initCfg(chiCfg);
                        this.appendChildren(childCom);
                        break;
                    case "rect":
                        childCom = new Rect(this);
                        childCom.initCfg(chiCfg);
                        this.appendChildren(childCom);
                        break;
                    case "input":
                        childCom = new Input(this);
                        childCom.initCfg(chiCfg);
                        this.appendChildren(childCom);
                        break;
                    case "button":
                        childCom = new Button(this);
                        childCom.initCfg(chiCfg);
                        this.appendChildren(childCom);
                        break;
                    default:
                        break;
                }
                return childCom;
            }
        }
    }, {
        key: "asyncGetView",
        value: function asyncGetView(viewCfg, resolve, reject) {
            var panel = new _panel2.default(this);
            panel.initCfg(viewCfg);
            this.appendChildren(panel);
            if (resolve) {
                resolve(panel);
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            var _this = this;

            //不在parent范围内，则不需要绘制
            var parentArea = this.inParentArea(this);
            if (parentArea === 0) {
                return false;
            }

            this.focusEnable();
            this.hoverEnable();
            this.activeEnable();

            //判断鼠标是否在组件范围内
            if (ctx.mouseAction.mx && ctx.mouseAction.my && this.isPointInComponent(ctx.mouseAction.mx, ctx.mouseAction.my)) {
                ctx.mouseAction.hoverCom = this;
            }

            //检查事件
            if (this.eventNotifys.length > 0) {
                this.eventNotifys.forEach(function (eventNotify) {
                    _this.checkEvent(eventNotify);
                });
                this.eventNotifys.length = 0;
            }
            return true;
        }

        /** 添加子节点 */

    }, {
        key: "appendChildren",
        value: function appendChildren(child) {
            this.children.push(child);
        }

        /** 设置通用样式，所有组件在绘制前都应该设置 */

    }, {
        key: "setCommonStyle",
        value: function setCommonStyle(ctx) {
            //半透明
            if (this.style.alpha) {
                ctx.globalAlpha = this.style.alpha;
            }
        }
    }, {
        key: "saveStyle",
        value: function saveStyle() {
            _commonUtil2.default.copyObject(this.style, this.originalStyle, true);
        }
    }, {
        key: "restoreStyle",
        value: function restoreStyle() {
            _commonUtil2.default.copyObject(this.originalStyle, this.style, true);
        }
    }, {
        key: "hoverEnable",
        value: function hoverEnable() {
            if (_globalUtil2.default.action.hoverComponent === this) {
                _commonUtil2.default.copyObject(this.style.hover, this.style, true);
            }
        }
    }, {
        key: "focusEnable",
        value: function focusEnable() {
            if (_globalUtil2.default.action.focusComponent === this) {
                _commonUtil2.default.copyObject(this.style.focus, this.style, true);
            }
        }
    }, {
        key: "activeEnable",
        value: function activeEnable() {
            if (_globalUtil2.default.action.activeComponent === this) {
                _commonUtil2.default.copyObject(this.style.active, this.style, true);
            }
        }

        /** 检查事件是否匹配 */

    }, {
        key: "checkEvent",
        value: function checkEvent(eventNotify) {
            if (eventNotify.type) {
                if (eventNotify.type === 1 && this.isPointInComponent(eventNotify.px, eventNotify.py)) //判断鼠标是否在控件范围内
                    {
                        _globalUtil2.default.eventBus.captureEvent(eventNotify);
                    } else if (eventNotify.type === 2 && _globalUtil2.default.action.focusComponent === this) //键盘事件
                    {
                        _globalUtil2.default.eventBus.captureEvent(eventNotify);
                    }
            }
        }

        /** this是否是com的父亲 */

    }, {
        key: "parentOf",
        value: function parentOf(com) {
            if (!com.parent) {
                return false;
            }
            if (com.parent === this) {
                return true;
            }
            return this.parentOf(com.parent);
        }
    }, {
        key: "getController",
        value: function getController(com) {
            if (!com.parent) {
                return com.controller;
            }
            if (com instanceof _panel2.default && com.controller) {
                return com.controller;
            } else {
                return this.getController(com.parent);
            }
        }

        //获取显示在界面上真实的x坐标，加上父级坐标

    }, {
        key: "getRealXRecursion",
        value: function getRealXRecursion(com) {
            if (com.parent) {
                return com.style.x + this.getRealXRecursion(com.parent) + (com.parent.style.borderWidth || 0);
            } else {
                return com.style.x;
            }
        }
    }, {
        key: "getRealX",
        value: function getRealX() {
            return this.getRealXRecursion(this);
        }
    }, {
        key: "getRealYRecursion",
        value: function getRealYRecursion(com) {
            if (com.parent) {
                return com.style.y + this.getRealYRecursion(com.parent) + (com.parent.style.borderWidth || 0);
            } else {
                return com.style.y;
            }
        }
    }, {
        key: "getRealY",
        value: function getRealY() {
            return this.getRealYRecursion(this);
        }
        /** 获取文本的坐标 */

    }, {
        key: "getTextRealX",
        value: function getTextRealX() {
            var oriX = this.getRealX() + (this.style.borderWidth || 0);
            //文字居中显示
            if (this.getText() && this.style.textAlign === "center") {
                var textLength = parseInt(this.style.fontSize) * this.getText().length;
                if (textLength <= this.getWidth()) {
                    return oriX + (this.getWidth() / 2 - textLength / 2);
                }
            }
            return oriX;
        }
    }, {
        key: "getTextRealY",
        value: function getTextRealY() {
            return this.getRealY() + (this.style.borderWidth || 0);
        }

        /** 高宽处理 */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            this.style.width = width;
        }
    }, {
        key: "setHeight",
        value: function setHeight(height) {
            this.style.height = height;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            if (!this.style.width) {
                return undefined;
            }
            if (this.style.width.toString().indexOf("%") > -1) //百分比
                {
                    var maxWidth = this.parent.getWidth() - (this.parent ? (this.parent.style.borderWidth || 0) * 2 : 0);
                    return maxWidth * (this.style.width.substring(0, this.style.width.length - 1) / 100);
                }
            return this.style.width;
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            if (!this.style.height) {
                return undefined;
            }
            if (this.style.height.toString().indexOf("%") > -1) {
                var maxHeight = this.parent.getHeight() - (this.parent ? (this.parent.style.borderWidth || 0) * 2 : 0);
                return maxHeight * (this.style.height.substring(0, this.style.height.length - 1) / 100);
            }
            return this.style.height;
        }

        /** 用\n分隔string，实现换行 */

    }, {
        key: "getTextForRows",
        value: function getTextForRows(text) {
            if (!text) {
                return undefined;
            }
            var rowsStr = void 0;
            if (!this.multiLine) //单行
                {
                    rowsStr = [text];
                } else {
                if (this.autoLine) //如果自动换行
                    {
                        var index = 0;
                        var charWidth = 0;
                        var char = void 0;
                        while (char = text.charAt(index)) {
                            if (char === "\n") {
                                charWidth = 0;
                            } else {
                                charWidth += parseInt(this.style.fontSize, 10);
                                if (charWidth > this.getWidth() - (this.style.borderWidth || 0) * 2) {
                                    //如果当前行宽度大于组件宽度，则添加一个换行符
                                    charWidth = 0;
                                    text = text.substring(0, index) + "\n" + text.substring(index);
                                }
                            }
                            index++;
                        }
                    }
                rowsStr = text.split("\n");
            }
            var i = void 0;
            var c = void 0;
            var arr = void 0;
            return rowsStr.map(function (row) {
                i = 0;
                arr = [];
                while (c = row.charAt(i)) {
                    arr.push(c);
                    i++;
                }
                return arr;
            });
        }
    }, {
        key: "setText",
        value: function setText(text) {
            this.text = this.getTextForRows(text);
        }
    }, {
        key: "getText",
        value: function getText() {
            if (!this.text) {
                return undefined;
            }
            return this.text.map(function (row, index) {
                return row.join("");
            }).join("\n");
        }
    }, {
        key: "getChildren",
        value: function getChildren() {
            return this.children;
        }
    }, {
        key: "registerEvent",
        value: function registerEvent(eventType, callback) {
            _globalUtil2.default.eventBus.registerEvent(this, eventType, callback);
        }
    }, {
        key: "addEventNotify",
        value: function addEventNotify(eventNotify) {
            this.eventNotifys.push(eventNotify);
        }
    }]);

    return Component;
}();

exports.default = Component;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rect = __webpack_require__(2);

var _rect2 = _interopRequireDefault(_rect);

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Input = function (_Rect) {
    _inherits(Input, _Rect);

    function Input(parent) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, parent));

        _this.showTextCursor = true;
        _this.showTextCursorInterval = 0;
        _this.multiLine = false;
        return _this;
    }

    _createClass(Input, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "initCfg", this).call(this, cfg);
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            if (!_get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "draw", this).call(this, ctx)) {
                return false;
            }

            ctx.save();
            this.setClip(ctx);
            ctx.beginPath();
            //focus
            if (_globalUtil2.default.action.focusComponent === this) {
                //绘制光标
                this.drawTextCursor(ctx);
            }
            ctx.restore();
            return true;
        }

        /** 获取文本输入光标位置 */

    }, {
        key: "getTextCursorPos",
        value: function getTextCursorPos() {
            var selectionEnd = _globalUtil2.default.action.inputListenerDom.selectionEnd;
            var textRow = void 0;
            if (this.text && this.text.length > 0) {
                for (var i = 0, j = this.text.length; i < j; i++) {
                    if (selectionEnd <= this.text[i].length) {
                        textRow = i;
                        break;
                    }
                    selectionEnd -= this.text[i].length;
                    selectionEnd--; //selectionEnd里包含多余的换行符，所以要减一个换行符
                }
                textRow = textRow === undefined ? this.text.length - 1 : textRow;
            }
            this.textCursorX = selectionEnd * parseInt(this.style.fontSize) + 1;
            this.textCursorY = this.style.lineHeight / 2 - parseInt(this.style.fontSize, 10) / 2 + this.style.lineHeight * (textRow || 0);
        }
    }, {
        key: "drawTextCursor",
        value: function drawTextCursor(ctx) {
            if (this.showTextCursor) {
                if (!_globalUtil2.default.action.inputListenerDom.compositionMode) {
                    this.getTextCursorPos();
                }
                ctx.fillStyle = "#000";
                ctx.moveTo(this.getTextRealX() + this.textCursorX, this.getTextRealY() + this.textCursorY + 2);
                ctx.lineTo(this.getTextRealX() + this.textCursorX, this.getTextRealY() + this.textCursorY + this.style.lineHeight - 2);
                ctx.stroke();
            }
            this.showTextCursorInterval++;
            if (this.showTextCursorInterval === 30) {
                this.showTextCursorInterval = 0;
                this.showTextCursor = !this.showTextCursor;
            }
        }
    }, {
        key: "onFocus",
        value: function onFocus(mx, my) {
            var _this2 = this;

            this.showTextCursorInterval = 0;
            this.showTextCursor = true;
            _globalUtil2.default.action.inputListenerDom.value = this.getText() || "";

            if (this.text) //点击输入框更改光标位置
                {
                    var textX = void 0;
                    var textY = void 0;
                    var charCount = 0;
                    this.text.forEach(function (row, index) {
                        row.forEach(function (char, cindex) {
                            textX = _this2.getTextRealX() + cindex * parseInt(_this2.style.fontSize, 10);
                            textY = _this2.getTextRealY() + _this2.style.lineHeight / 2 - parseInt(_this2.style.fontSize, 10) / 2 + _this2.style.lineHeight * index;
                            if (my >= textY && my <= textY + parseInt(_this2.style.fontSize, 10) && mx >= textX && mx <= textX + parseInt(_this2.style.fontSize, 10)) {
                                _globalUtil2.default.action.inputListenerDom.setSelectionRange(charCount + 1, charCount + 1);
                            }
                            charCount++;
                        });
                        charCount++; //加上换行符
                    });
                }
        }
    }, {
        key: "getTextRealX",
        value: function getTextRealX() {
            var oriX = _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "getTextRealX", this).call(this);
            if (this.textCursorX > this.getWidth()) //防止光标超出显示区域
                {
                    return oriX - (this.textCursorX - this.getWidth());
                }
            return oriX;
        }
    }, {
        key: "getTextRealY",
        value: function getTextRealY() {
            var oriY = _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "getTextRealY", this).call(this);
            if (this.multiLine) {
                return oriY;
            } else {
                return oriY + this.getHeight() / 2 - this.style.lineHeight / 2;
            }
        }
    }]);

    return Input;
}(_rect2.default);

exports.default = Input;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by heju on 2017/7/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fps = __webpack_require__(8);

var _fps2 = _interopRequireDefault(_fps);

var _httpUtil = __webpack_require__(19);

var _httpUtil2 = _interopRequireDefault(_httpUtil);

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _controller = __webpack_require__(20);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main(eleId) {
        _classCallCheck(this, Main);

        var mainBody = document.getElementById(eleId);
        this.fps = new _fps2.default(mainBody);

        _globalUtil2.default.action = {};

        //输入框输入监听
        _globalUtil2.default.action.inputListenerDom = document.createElement("TEXTAREA");
        _globalUtil2.default.action.inputListenerDom.style.position = "fixed";
        _globalUtil2.default.action.inputListenerDom.style.left = "0px";
        _globalUtil2.default.action.inputListenerDom.style.top = "0px";
        _globalUtil2.default.action.inputListenerDom.style["z-index"] = -1;
        document.body.appendChild(_globalUtil2.default.action.inputListenerDom);
    }

    _createClass(Main, [{
        key: "setMainView",
        value: function setMainView(viewCfg) {
            this.fps.setMainView(viewCfg);
            this.fps.startLoop();
        }
    }, {
        key: "run",
        value: function run(viewCfg) {
            this.setMainView(viewCfg);
        }
    }]);

    return Main;
}();

window.Monk = {
    Main: Main,
    commonUtil: _commonUtil2.default,
    httpUtil: _httpUtil2.default,
    Controller: _controller2.default
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by heju on 2017/7/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _viewState = __webpack_require__(9);

var _viewState2 = _interopRequireDefault(_viewState);

var _eventBus = __webpack_require__(12);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fps = function () {
    function Fps(mainBody) {
        _classCallCheck(this, Fps);

        _globalUtil2.default.canvas = document.createElement("CANVAS");
        mainBody.appendChild(_globalUtil2.default.canvas);
        _globalUtil2.default.canvas.width = mainBody.offsetWidth;
        _globalUtil2.default.canvas.height = mainBody.offsetHeight;
        this.ctx = _globalUtil2.default.canvas.getContext('2d');
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        _globalUtil2.default.eventBus = new _eventBus2.default(_globalUtil2.default.canvas);
    }

    _createClass(Fps, [{
        key: "setMainView",
        value: function setMainView(viewCfg) {
            _globalUtil2.default.viewState = new _viewState2.default(this.ctx);
            _globalUtil2.default.viewState.init(viewCfg);
        }

        /** 开始循环绘制 */

    }, {
        key: "startLoop",
        value: function startLoop() {
            window.requestAnimationFrame(this.draw.bind(this));
        }
    }, {
        key: "drawView",
        value: function drawView(com) {
            if (!com.active) {
                return;
            }
            com.saveStyle();
            if (com.draw(this.ctx)) {
                var children = com.getChildren();
                if (children) {
                    if (children instanceof Array) {
                        var child = void 0;
                        for (var i = 0, j = children.length; i < j; i++) {
                            child = children[i];
                            this.drawView(child);
                        }
                    } else {
                        this.drawView(children);
                    }
                }
            }
            com.restoreStyle();
        }
    }, {
        key: "draw",
        value: function draw() {
            //背景
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(0, 0, _globalUtil2.default.canvas.width, _globalUtil2.default.canvas.height);

            _globalUtil2.default.viewState.beforeDraw(this.ctx);
            this.drawView(_globalUtil2.default.viewState.rootPanel);
            _globalUtil2.default.viewState.afterDraw(this.ctx);

            window.requestAnimationFrame(this.draw.bind(this));
        }
    }]);

    return Fps;
}();

exports.default = Fps;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by heju on 2017/7/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _panel = __webpack_require__(4);

var _panel2 = _interopRequireDefault(_panel);

var _router = __webpack_require__(11);

var _router2 = _interopRequireDefault(_router);

var _input = __webpack_require__(6);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewState = function () {
    function ViewState(ctx) {
        var _this = this;

        _classCallCheck(this, ViewState);

        this.isViewState = true;

        this.defaultFontFamily = "Microsoft YaHei";
        this.defaultFontSize = "14px";

        ctx.mouseAction = {};

        _globalUtil2.default.eventBus.registerEvent(this, "mousedown", function (e) {
            if (_globalUtil2.default.action.hoverComponent) {
                _globalUtil2.default.action.focusComponent = _globalUtil2.default.action.hoverComponent;
                _globalUtil2.default.action.activeComponent = _globalUtil2.default.action.hoverComponent;
                if (_globalUtil2.default.action.focusComponent.onFocus && typeof _globalUtil2.default.action.focusComponent.onFocus === "function") {
                    _globalUtil2.default.action.focusComponent.onFocus(e.pageX, e.pageY);
                }
            }
        });
        _globalUtil2.default.eventBus.registerEvent(this, "mouseup", function (e) {
            _globalUtil2.default.action.inputListenerDom.focus();
            if (_globalUtil2.default.action.activeComponent) {
                _globalUtil2.default.action.activeComponent = undefined;
            }
        });
        _globalUtil2.default.eventBus.registerEvent(this, "mousemove", function (e) {
            ctx.mouseAction.mx = e.pageX;
            ctx.mouseAction.my = e.pageY;
        });

        //输入框事件
        _globalUtil2.default.action.inputListenerDom.compositionMode = false; //是否输入法状态
        _globalUtil2.default.eventBus.addEventListener(_globalUtil2.default.action.inputListenerDom, "compositionstart", function (e) {
            _globalUtil2.default.action.inputListenerDom.compositionMode = true;
        });
        _globalUtil2.default.eventBus.addEventListener(_globalUtil2.default.action.inputListenerDom, "compositionend", function (e) {
            _globalUtil2.default.action.inputListenerDom.compositionMode = false;
            if (_globalUtil2.default.action.focusComponent && _globalUtil2.default.action.focusComponent instanceof _input2.default) {
                _this.setVal2FocusCom();
            }
        });
        _globalUtil2.default.eventBus.addEventListener(_globalUtil2.default.action.inputListenerDom, "input", function (e) {
            if (!_globalUtil2.default.action.inputListenerDom.compositionMode && _globalUtil2.default.action.focusComponent && _globalUtil2.default.action.focusComponent instanceof _input2.default) {
                _this.setVal2FocusCom();
            }
        });
    }

    _createClass(ViewState, [{
        key: "init",
        value: function init(viewCfg) {
            if (viewCfg.type == "panel") {
                this.rootPanel = new _panel2.default();
                this.rootPanel.initCfg(viewCfg);
            } else if (viewCfg.type == "route") {
                this.rootPanel = new _router2.default();
                this.rootPanel.initCfg(viewCfg);
            }
        }

        /** 绘制前 */

    }, {
        key: "beforeDraw",
        value: function beforeDraw(ctx) {
            //通知触发事件
            _globalUtil2.default.eventBus.doNotifyEvent();

            ctx.mouseAction.hoverCom = undefined;
        }

        /** 绘制后 */

    }, {
        key: "afterDraw",
        value: function afterDraw(ctx) {
            _globalUtil2.default.eventBus.propagationEvent();

            //全部绘制完后检查hover的组件
            if (ctx.mouseAction.hoverCom) {
                _globalUtil2.default.action.hoverComponent = ctx.mouseAction.hoverCom;
            }
        }

        /** 将textarea中的值设置到焦点组件 */

    }, {
        key: "setVal2FocusCom",
        value: function setVal2FocusCom() {
            _globalUtil2.default.action.focusComponent.setText(_globalUtil2.default.action.inputListenerDom.value);
            _globalUtil2.default.action.inputListenerDom.value = _globalUtil2.default.action.focusComponent.getText() || "";
        }
    }, {
        key: "addEventNotify",
        value: function addEventNotify(eventNotify) {
            _globalUtil2.default.eventBus.captureEvent(eventNotify); //为了最后执行mousedown事件，必须第一个占坑
        }
    }, {
        key: "getComponentInChildrenByKey",
        value: function getComponentInChildrenByKey(key, val, com) {
            var children = com.getChildren();
            if (children) {
                var retCom = void 0;
                if (children instanceof Array) {
                    var child = void 0;
                    for (var i = 0, j = children.length; i < j; i++) {
                        child = children[i];
                        if (child[key] && child[key] === val) {
                            return child;
                        }
                        retCom = this.getComponentInChildrenByKey(key, val, child);
                        if (retCom) {
                            return retCom;
                        }
                        if (i == j - 1) {
                            return undefined;
                        }
                    }
                } else {
                    if (children[key] && children[key] === val) {
                        return children;
                    } else {
                        return this.getComponentInChildrenByKey(key, val, children);
                    }
                }
            } else {
                return undefined;
            }
        }
    }, {
        key: "getComponentById",
        value: function getComponentById(id) {
            if (this.rootPanel.id && this.rootPanel.id === id) {
                return this.rootPanel;
            } else {
                return this.getComponentInChildrenByKey("id", id, this.rootPanel);
            }
        }
    }]);

    return ViewState;
}();

exports.default = ViewState;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rect = __webpack_require__(2);

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Rect) {
    _inherits(Button, _Rect);

    function Button(parent) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, parent));

        _this.style.textAlign = "center";
        return _this;
    }

    _createClass(Button, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "initCfg", this).call(this, cfg);
            this.style.lineHeight = this.getHeight();
        }
    }]);

    return Button;
}(_rect2.default);

exports.default = Button;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Component) {
    _inherits(Router, _Component);

    function Router(parent) {
        _classCallCheck(this, Router);

        var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, parent));

        _this.routes = {};
        _this.children = [];

        _this.style.x = 0;
        _this.style.y = 0;
        if (!parent) //最顶层
            {
                _this.setWidth(_globalUtil2.default.canvas.width);
                _this.setHeight(_globalUtil2.default.canvas.height);
            } else {
            _this.setWidth(parent.getWidth());
            _this.setHeight(parent.getHeight());
        }
        return _this;
    }

    _createClass(Router, [{
        key: "initCfg",
        value: function initCfg(cfg) {
            _get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), "initCfg", this).call(this, cfg);

            if (cfg.routes) {
                var rCfg = void 0;
                for (var name in cfg.routes) {
                    rCfg = cfg.routes[name];
                    this.routes[name] = {
                        loader: rCfg.view
                    };
                    if (rCfg.default) {
                        this.currentRoute = name;
                        this.getChildrenView();
                    }
                }
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            return true;
        }
    }, {
        key: "getChildrenView",
        value: function getChildrenView() {
            var _this2 = this;

            if (!this.currentChildren) {
                if (this.routes[this.currentRoute].num === undefined) {
                    var retChild = this.produceChildren(this.routes[this.currentRoute].loader);
                    if (retChild instanceof Promise) {
                        retChild.then(function (child) {
                            _this2.routes[_this2.currentRoute].num = _this2.children.length - 1;
                            _this2.currentChildren = child;
                            _this2.currentChildren.active = true;
                        });
                    } else {
                        this.routes[this.currentRoute].num = this.children.length - 1;
                        this.currentChildren = retChild;
                        this.currentChildren.active = true;
                    }
                } else {
                    this.currentChildren = this.children[this.routes[this.currentRoute].num];
                    this.currentChildren.active = true;
                }
            }
        }
    }, {
        key: "getChildren",
        value: function getChildren() {
            return this.currentChildren;
        }
    }, {
        key: "changeRoute",
        value: function changeRoute(name) {
            if (this.currentChildren) {
                this.currentChildren.active = false;
            }
            this.currentRoute = name;
            this.currentChildren = undefined;
            this.getChildrenView();
        }
    }]);

    return Router;
}(_component2.default);

exports.default = Router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by heju on 2017/7/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _eventListener = __webpack_require__(13);

var _eventListener2 = _interopRequireDefault(_eventListener);

var _clickEvent = __webpack_require__(14);

var _clickEvent2 = _interopRequireDefault(_clickEvent);

var _mouseEvent = __webpack_require__(15);

var _mouseEvent2 = _interopRequireDefault(_mouseEvent);

var _keyEvent = __webpack_require__(16);

var _keyEvent2 = _interopRequireDefault(_keyEvent);

var _stack = __webpack_require__(17);

var _stack2 = _interopRequireDefault(_stack);

var _eventNotify = __webpack_require__(18);

var _eventNotify2 = _interopRequireDefault(_eventNotify);

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

var _commonUtil = __webpack_require__(1);

var _commonUtil2 = _interopRequireDefault(_commonUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = function () {
    function EventBus(canvas) {
        _classCallCheck(this, EventBus);

        this.canvas = canvas;
        //注册事件列表
        this.eventListeners = {
            "click": [],
            "mousedown": [],
            "mousemove": [],
            "mouseup": [],
            "keydown": [],
            "keyup": []
        };
        //事件通知队列
        this.eventNotifyQueue = [];
        //事件冒泡执行队列
        this.propagationEventQueue = {};

        this.initDomEvent();
    }

    _createClass(EventBus, [{
        key: "addEventListener",
        value: function addEventListener(dom, type, callback) {
            if (window.addEventListener) {
                dom.addEventListener(type, callback, false);
            } else {
                dom.attachEvent("on" + type, callback);
            }
        }
    }, {
        key: "initDomEvent",
        value: function initDomEvent() {
            var _this = this;

            this.addEventListener(this.canvas, "click", function (e) {
                _this.createEventNotify(e, "click");
            });

            this.addEventListener(this.canvas, "mousedown", function (e) {
                _this.createEventNotify(e, "mousedown");
            });

            this.addEventListener(this.canvas, "mousemove", function (e) {
                _this.createEventNotify(e, "mousemove");
            });

            this.addEventListener(this.canvas, "mouseup", function (e) {
                _this.createEventNotify(e, "mouseup");
            });

            this.addEventListener(window, "keydown", function (e) {
                _this.createKeyEventNotify(e, "keydown");
            });

            this.addEventListener(window, "keyup", function (e) {
                _this.createKeyEventNotify(e, "keyup");
            });
        }

        /**
         * 创建冒泡执行堆栈，用批次号分类
         *
         * @return 批次号（时间戳）
         */

    }, {
        key: "createPropagationStack",
        value: function createPropagationStack() {
            var batchNo = new Date().getTime();
            this.propagationEventQueue[batchNo] = new _stack2.default();
            return batchNo;
        }
    }, {
        key: "createEventNotify",
        value: function createEventNotify(e, type) {
            var _this2 = this;

            e = e || window.event;
            var px = e.pageX;
            var py = e.pageY;
            var batchNo = this.createPropagationStack();
            var eventNotify = void 0;
            this.eventNotifyQueue.push(function () {
                var eventListeners = _this2.eventListeners[type];
                if (eventListeners.length > 0) {
                    var listener = void 0;
                    for (var i = eventListeners.length - 1; i >= 0; i--) {
                        listener = eventListeners[i];
                        if (listener.target.isViewState || listener.target.active) {
                            eventNotify = new _eventNotify2.default();
                            eventNotify.set({
                                batchNo: batchNo,
                                type: 1,
                                px: px,
                                py: py,
                                listener: listener
                            });
                            listener.setSourceEvent(e);
                            listener.target.addEventNotify(eventNotify);
                        }
                    }
                }
            });
        }
    }, {
        key: "createKeyEventNotify",
        value: function createKeyEventNotify(e, type) {
            var _this3 = this;

            e = e || window.event;
            var batchNo = this.createPropagationStack();
            var eventNotify = void 0;
            this.eventNotifyQueue.push(function () {
                _this3.eventListeners[type].forEach(function (listener) {
                    if (listener.target.isViewState || listener.target.active) {
                        eventNotify = new _eventNotify2.default();
                        eventNotify.set({
                            batchNo: batchNo,
                            type: 2,
                            listener: listener
                        });
                        listener.setSourceEvent(e);
                        listener.target.addEventNotify(eventNotify);
                    }
                });
            });
        }

        //通知触发事件

    }, {
        key: "doNotifyEvent",
        value: function doNotifyEvent() {
            this.eventNotifyQueue.forEach(function (eventFun) {
                if (eventFun && typeof eventFun == "function") {
                    eventFun();
                }
            });
            this.eventNotifyQueue.length = 0;
        }

        //捕获事件

    }, {
        key: "captureEvent",
        value: function captureEvent(eventNotify) {
            if (!this.propagationEventQueue[eventNotify.batchNo]) {
                return;
            }
            this.propagationEventQueue[eventNotify.batchNo].push(eventNotify.listener);
        }

        /**
         * 冒泡执行事件
         */

    }, {
        key: "propagationEvent",
        value: function propagationEvent() {
            var listener = void 0;
            var bubble = void 0; //上一个冒泡节点
            var target = void 0;
            var event = void 0;
            var top = void 0;
            var key = void 0;
            for (key in this.propagationEventQueue) {
                bubble = undefined;
                target = undefined;
                event = undefined;
                top = this.propagationEventQueue[key].getTop();
                if (top) //获取target，第一个冒泡节点的target
                    {
                        target = top.target;
                    }
                while (listener = this.propagationEventQueue[key].pop()) {
                    if (listener.target.isViewState || !bubble //viewstate节点或第一个节点
                    || event && event.immediatePropagation && bubble === listener.target //自己
                    || event && event.propagation && listener.target.parentOf(bubble)) //parent
                        {
                            event = this.getEvent(listener);
                            event.setTarget(target);
                            if (listener.callback && typeof listener.callback === "function") {
                                listener.callback(event);
                            }
                            bubble = listener.target;
                        }
                }
                delete this.propagationEventQueue[key];
            }
        }
    }, {
        key: "getEvent",
        value: function getEvent(listener) {
            var event = void 0;
            switch (listener.type) {
                case "click":
                    event = new _clickEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    break;
                case "mousedown":
                    event = new _mouseEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    event.setButton(listener.sourceEvent.button);
                    event.setPageX(listener.sourceEvent.pageX);
                    event.setPageY(listener.sourceEvent.pageY);
                    break;
                case "mousemove":
                    event = new _mouseEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    event.setPageX(listener.sourceEvent.pageX);
                    event.setPageY(listener.sourceEvent.pageY);
                    break;
                case "mouseup":
                    event = new _mouseEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    event.setButton(listener.sourceEvent.button);
                    event.setPageX(listener.sourceEvent.pageX);
                    event.setPageY(listener.sourceEvent.pageY);
                    break;
                case "keydown":
                    event = new _keyEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    event.setKey(listener.sourceEvent.key);
                    event.setKeyCode(listener.sourceEvent.keyCode);
                    break;
                case "keyup":
                    event = new _keyEvent2.default(listener.type);
                    event.setCurrentTarget(listener.target);
                    event.setKey(listener.sourceEvent.key);
                    event.setKeyCode(listener.sourceEvent.keyCode);
                    break;
                default:
                    break;
            }
            return event;
        }

        /** 注册事件 */

    }, {
        key: "registerEvent",
        value: function registerEvent(com, type, callback) {
            var listener = this.getEventListener(com, type, callback);
            this.eventListeners[type].push(listener);
            return listener;
        }
    }, {
        key: "getEventListener",
        value: function getEventListener(target, type, callback) {
            var eventListener = new _eventListener2.default(type, callback);
            eventListener.setTarget(target);
            return eventListener;
        }
    }]);

    return EventBus;
}();

exports.default = EventBus;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//事件监听类
var EventListener = function () {
    function EventListener(type, callback) {
        _classCallCheck(this, EventListener);

        this.type = type;
        this.callback = callback;
    }

    _createClass(EventListener, [{
        key: "setTarget",
        value: function setTarget(target) {
            this.target = target;
        }
    }, {
        key: "setSourceEvent",
        value: function setSourceEvent(sourceEvent) {
            this.sourceEvent = sourceEvent;
        }
    }]);

    return EventListener;
}();

exports.default = EventListener;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = __webpack_require__(3);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ClickEvent = function (_Event) {
    _inherits(ClickEvent, _Event);

    function ClickEvent(type) {
        _classCallCheck(this, ClickEvent);

        return _possibleConstructorReturn(this, (ClickEvent.__proto__ || Object.getPrototypeOf(ClickEvent)).call(this, type));
    }

    return ClickEvent;
}(_event2.default);

exports.default = ClickEvent;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(3);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MouseEvent = function (_Event) {
    _inherits(MouseEvent, _Event);

    function MouseEvent(type) {
        _classCallCheck(this, MouseEvent);

        var _this = _possibleConstructorReturn(this, (MouseEvent.__proto__ || Object.getPrototypeOf(MouseEvent)).call(this, type));

        _this.pageX = undefined;
        _this.pageY = undefined;
        _this.button = undefined;
        return _this;
    }

    _createClass(MouseEvent, [{
        key: "setPageX",
        value: function setPageX(x) {
            this.pageX = x;
        }
    }, {
        key: "setPageY",
        value: function setPageY(y) {
            this.pageY = y;
        }
    }, {
        key: "setButton",
        value: function setButton(button) {
            this.button = button;
        }
    }]);

    return MouseEvent;
}(_event2.default);

exports.default = MouseEvent;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(3);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var KeyEvent = function (_Event) {
    _inherits(KeyEvent, _Event);

    function KeyEvent(type) {
        _classCallCheck(this, KeyEvent);

        var _this = _possibleConstructorReturn(this, (KeyEvent.__proto__ || Object.getPrototypeOf(KeyEvent)).call(this, type));

        _this.key = undefined;
        _this.keyCode = undefined;
        return _this;
    }

    _createClass(KeyEvent, [{
        key: "setKey",
        value: function setKey(key) {
            this.key = key;
        }
    }, {
        key: "setKeyCode",
        value: function setKeyCode(keyCode) {
            this.keyCode = keyCode;
        }
    }]);

    return KeyEvent;
}(_event2.default);

exports.default = KeyEvent;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by heju on 2017/7/26.
 */
var Stack = function () {
    function Stack() {
        _classCallCheck(this, Stack);
    }

    _createClass(Stack, [{
        key: "push",
        value: function push(obj) {
            if (obj) {
                var data = void 0;
                if (!this.top) {
                    data = {
                        value: obj
                    };
                } else {
                    data = {
                        value: obj,
                        next: this.top
                    };
                }
                this.top = data;
            }
        }
    }, {
        key: "pop",
        value: function pop() {
            if (!this.top) {
                return undefined;
            }
            var ret = void 0;
            if (this.top) {
                ret = this.top.value;
            }
            this.top = this.top.next;
            return ret;
        }
    }, {
        key: "getTop",
        value: function getTop() {
            return this.top ? this.top.value : undefined;
        }
    }]);

    return Stack;
}();

exports.default = Stack;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by heju on 2017/7/26.
 */
//事件通知类
var EventNotify = function () {
    function EventNotify() {
        _classCallCheck(this, EventNotify);
    }

    /**
     * 设置通知，下次循环draw的时候用这些值判断是否触发事件
     */


    _createClass(EventNotify, [{
        key: "set",
        value: function set(obj) {
            this.batchNo = obj.batchNo; //批次号，表明是哪一批次的事件
            this.type = obj.type; //1：鼠标相关事件；2：键盘事件
            this.px = obj.px;
            this.py = obj.py;
            this.listener = obj.listener;
        }
    }]);

    return EventNotify;
}();

exports.default = EventNotify;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by heju on 2017/2/10.
 */
var httpUtil = {
    getGetParamStr: function getGetParamStr(param, normal) {
        var str = "";
        if (param != undefined) {
            for (var key in param) {
                if (normal) {
                    str += key + "=" + param[key] + "&";
                } else {
                    str += "/" + param[key];
                }
            }
            if (normal) {
                str = str.substring(0, str.length - 1);
            }
        }
        return str;
    },
    get: function get(url, param) {
        return new Promise(function (resolve, reject) {
            var purl = url;
            if (param) {
                purl = url + httpUtil.getGetParamStr(param);
            }
            var xmlhttp = void 0;
            if (window.XMLHttpRequest) {
                //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                xmlhttp = new XMLHttpRequest();
            } else {
                // IE6, IE5 浏览器执行代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    resolve(xmlhttp.response);
                }
            };
            xmlhttp.open("GET", purl, true);
            xmlhttp.send();
        });
    },
    post: function post(url, param, callback, errCallback) {
        $.ajax({
            type: "post",
            contentType: 'application/json',
            data: JSON.stringify(param),
            url: url,
            success: function success(data, textStatus, jqXHR) {
                if (callback && typeof callback == "function") {
                    callback.apply(this, [data]);
                }
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                if (errCallback && typeof errCallback == "function") {
                    errCallback.apply(this, [textStatus]);
                }
            }
        });
    }
};
exports.default = httpUtil;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _globalUtil = __webpack_require__(0);

var _globalUtil2 = _interopRequireDefault(_globalUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by heju on 2017/7/21.
                                                                                                                                                           */


var Controller = function Controller(panel) {
    _classCallCheck(this, Controller);

    this.panel = panel;
    this.viewState = _globalUtil2.default.viewState;
};

exports.default = Controller;

/***/ })
/******/ ]);
//# sourceMappingURL=monk.js.map