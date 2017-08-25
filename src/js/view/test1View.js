/**
 * Created by heju on 2017/7/21.
 */
import Test1Controller from "../controller/test1Controller.js";

export default {
    controller : Test1Controller,
    type : "panel",
    style : {
        x : 40,
        y : 240,
        width : 100,
        height : 100,
        backgroundColor : "#0000ff"
    },
    events : {
        "click" : "changeRoute"
    },
    children : [
        {
            type : "rect",
            style : {
                x : 60,
                y : 50,
                width : "auto",
                height : "auto",
                backgroundImage : "/src/images/default_man.png",
                alpha : 1.0,
                hover : {
                    alpha : 0.6
                }
            },
            events : {
                "click" : {
                    callback : "imgClick",
                    param : (self)=>{
                        return [self.width, self.height];
                    }
                }
            }
        },
        {
            type : "rect",
            style : {
                x : -10,
                y : -10,
                width : 80,
                height : 80,
                backgroundColor : "#15c9ff"
            }
        }
    ]
};