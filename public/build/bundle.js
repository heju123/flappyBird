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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mainView = __webpack_require__(1);

var _mainView2 = _interopRequireDefault(_mainView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by heju on 2017/7/19.
                                                                                                                                                           */


var Main = function Main() {
    _classCallCheck(this, Main);

    var mainBox = document.getElementById("mainBox");
    mainBox.style.width = "864px";
    mainBox.style.height = "512px";

    var monk = new window.monk.Main("mainBox");

    monk.run(_mainView2.default);
};

var main = new Main();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mainController = __webpack_require__(2);

var _mainController2 = _interopRequireDefault(_mainController);

var _route = __webpack_require__(4);

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    controller: _mainController2.default,
    type: "rect",
    style: {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    },
    children: [{
        name: "bg",
        type: "rect",
        style: {
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
            layout: {
                type: "linearLayout",
                orientation: "horizontal"
            },
            zIndex: -1
        }
    }, _route2.default]
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bgView = __webpack_require__(3);

var _bgView2 = _interopRequireDefault(_bgView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by heju on 2017/7/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MainController = function (_window$monk$Controll) {
    _inherits(MainController, _window$monk$Controll);

    function MainController(component) {
        _classCallCheck(this, MainController);

        var _this = _possibleConstructorReturn(this, (MainController.__proto__ || Object.getPrototypeOf(MainController)).call(this, component));

        _this.registerEvent("$onViewLoaded", function () {
            //生成背景图片
            var bgCom = void 0;
            var bg = _this.component.getComponentByName("bg");
            for (var i = 0; i < 3; i++) {
                bgCom = new window.monk.components.Rect(bg);
                bgCom.initCfg(_bgView2.default).then(function (bgCom) {
                    return function () {
                        bg.appendChildren(bgCom);
                    };
                }(bgCom));
            }
        });
        return _this;
    }

    _createClass(MainController, [{
        key: "goStartGame",
        value: function goStartGame() {
            var mainRoute = this.viewState.getComponentById("mainRoute");
            mainRoute.changeRoute("game");
        }
    }]);

    return MainController;
}(window.monk.Controller);

exports.default = MainController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    type: "rect",
    style: {
        autoWidth: true,
        autoHeight: true,
        backgroundImage: "/build/images/background.png",
        zIndex: -1
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _startView = __webpack_require__(5);

var _startView2 = _interopRequireDefault(_startView);

var _gameView = __webpack_require__(7);

var _gameView2 = _interopRequireDefault(_gameView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by heju on 2017/7/27.
 */
exports.default = {
    id: "mainRoute",
    type: "route",
    routes: {
        "start": {
            view: _startView2.default,
            default: true
        },
        "game": {
            view: _gameView2.default
        }
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _startController = __webpack_require__(6);

var _startController2 = _interopRequireDefault(_startController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    controller: _startController2.default,
    type: "rect",
    style: {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    },
    children: [{
        name: "titleImage",
        type: "rect",
        style: {
            x: function x() {
                return this.parent.getWidth() / 2 - this.getWidth() / 2;
            },
            y: "30%",
            autoWidth: true,
            autoHeight: true,
            backgroundImage: "/build/images/title.png"
        }
    }, {
        name: "btnStart",
        type: "rect",
        style: {
            x: function x() {
                return this.parent.getWidth() / 2 - this.getWidth() / 2;
            },
            y: function y() {
                return this.parent.getHeight() / 2 - this.getHeight() / 2;
            },
            autoWidth: true,
            autoHeight: true,
            backgroundImage: "/build/images/startButton.png",
            hover: {
                alpha: 0.8
            }
        },
        events: {
            "click": "goStartGame"
        }
    }]
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by heju on 2017/7/14.
 */
var StartController = function (_window$monk$Controll) {
    _inherits(StartController, _window$monk$Controll);

    function StartController(component) {
        _classCallCheck(this, StartController);

        return _possibleConstructorReturn(this, (StartController.__proto__ || Object.getPrototypeOf(StartController)).call(this, component));
    }

    _createClass(StartController, [{
        key: "goStartGame",
        value: function goStartGame() {
            var mainRoute = this.viewState.getComponentById("mainRoute");
            mainRoute.changeRoute("game");
        }
    }]);

    return StartController;
}(window.monk.Controller);

exports.default = StartController;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gameController = __webpack_require__(8);

var _gameController2 = _interopRequireDefault(_gameController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    controller: _gameController2.default,
    type: "rect",
    style: {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    },
    children: [{
        id: "mainMap",
        type: "map",
        style: {
            x: 0,
            y: 0,
            backgroundColor: "#dbdbdb"
        },
        mapDataUrl: "/build/maps/flappyBird.map",
        terrainPolicy: {
            "block": {
                backgroundColor: "#000000"
            }
        }
    }]
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by heju on 2017/7/14.
 */
var GameController = function (_window$monk$Controll) {
    _inherits(GameController, _window$monk$Controll);

    function GameController(component) {
        _classCallCheck(this, GameController);

        var _this = _possibleConstructorReturn(this, (GameController.__proto__ || Object.getPrototypeOf(GameController)).call(this, component));

        _this.registerEvent("$onViewLoaded", function () {
            _this.mapView = _this.component.getComponentById("mainMap");

            window.monk.commonUtil.createImageDom("/build/images/tube.png").then(function (imgThis) {
                _this.tubeImageDom = imgThis;
            });
        });
        return _this;
    }

    _createClass(GameController, [{
        key: "draw",
        value: function draw(ctx) {
            if (!this.mapView || !this.mapView.mapData || !this.tubeImageDom) {
                return;
            }
            for (var row = 0; row < this.mapView.mapHeight; row++) {
                for (var col = 0; col < this.mapView.mapWidth; col++) {
                    if (this.mapView.mapData[row][col].terrain == 1) {
                        ctx.drawImage(this.tubeImageDom, this.mapView.getRealX() + col * this.mapView.mapSize, this.mapView.getRealY() + row * this.mapView.mapSize - this.tubeImageDom.naturalHeight + parseInt(this.mapView.mapSize, 10), this.tubeImageDom.width, this.tubeImageDom.height);
                    } else if (this.mapView.mapData[row][col].terrain == 2) {
                        ctx.save();
                        var transX = this.mapView.getRealX() + col * this.mapView.mapSize + this.tubeImageDom.naturalWidth / 2;
                        var transY = this.mapView.getRealY() + row * this.mapView.mapSize + this.tubeImageDom.naturalHeight / 2;
                        ctx.translate(transX, transY);
                        ctx.scale(1, -1);
                        ctx.translate(-transX, -transY);

                        ctx.drawImage(this.tubeImageDom, this.mapView.getRealX() + col * this.mapView.mapSize, this.mapView.getRealY() + row * this.mapView.mapSize, this.tubeImageDom.width, this.tubeImageDom.height);
                        ctx.restore();
                    }
                }
            }
        }
    }]);

    return GameController;
}(window.monk.Controller);

exports.default = GameController;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map