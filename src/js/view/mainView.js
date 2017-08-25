import MainController from "../controller/mainController.js";
import ChildController from "../controller/childController.js";
import layoutTestView from "./layoutTestView.js";

export default {
    controller : MainController,
    type : "panel",
    style : {
        x : 40,
        y : 40,
        width : 2000,
        height : 2000,
        backgroundColor : "#ffffff"
    },
    events : {
        "click" : "clickMain",
        "mousedown" : "mouseDown"
    },
    children : [
        {
            controller : ChildController,
            type : "panel",
            style : {
                x : 10,
                y : 10,
                width : 200,
                height : 200,
                backgroundColor : "#5789ff",
                hover : {
                    backgroundColor : "#9daaff"
                },
                active : {
                    backgroundColor : "#ffd45d"
                }
            }
        },
        {
            type : "button",
            style : {
                x : 220,
                y : 220,
                width : 100,
                height : 30,
                backgroundColor : "#afafaf",
                borderWidth : 1,
                borderColor : "#303030"
            },
            text : '测试按钮'
        },
        {
            type : "input",
            multiLine : true,
            style : {
                x : 20,
                y : 20,
                width : 100,
                height : 160,
                backgroundColor : "#bababa",
                borderWidth : 6,
                borderColor : "#7a7a7a",
                focus : {
                    borderColor : "#ff0000"
                },
                hover : {
                    borderColor : "#383838"
                },
                active : {
                    borderColor : "#ffd45d"
                }
            },
            events : {
                "mousedown" : "mousedownInput"
            }
        },
        {
            type : "input",
            style : {
                x : 420,
                y : 420,
                width : 100,
                height : 30,
                backgroundColor : "#bababa",
                borderWidth : 1,
                borderColor : "#7a7a7a",
                textAlign : "center",
                borderRadius : 5,
                focus : {
                    borderColor : "#ff0000"
                },
                hover : {
                    borderColor : "#383838"
                },
                active : {
                    borderColor : "#ffd45d"
                }
            }
        },
        {
            type : "rect",
            style : {
                x : 360,
                y : 350,
                width : 32,
                height : 32,
                backgroundImage : "/src/images/tip_msg.png",
                backgroundImageClip : [0,128,32,32]
            }
        },
        (get) => {
            return new Promise((resolve, reject)=>{
                require.ensure([], require => {
                    get(require("./test1View.js").default, resolve, reject);
                },'test1View');
            });
        },
        layoutTestView
    ]
};