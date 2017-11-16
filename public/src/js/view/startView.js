import StartController from "../controller/startController.js";

export default {
    controller : StartController,
    type : "rect",
    style : {
        x : 0,
        y : 0,
        width : "100%",
        height : "100%"
    },
    children : [
        {
            name : "titleImage",
            type : "rect",
            style : {
                x : function(){
                    return this.parent.getWidth() / 2 - this.getWidth() / 2;
                },
                y : "30%",
                autoWidth : true,
                autoHeight : true,
                backgroundImage : "/build/images/title.png"
            }
        },
        {
            name : "btnStart",
            type : "rect",
            style : {
                x : function(){
                    return this.parent.getWidth() / 2 - this.getWidth() / 2;
                },
                y : function(){
                    return this.parent.getHeight() / 2 - this.getHeight() / 2;
                },
                autoWidth : true,
                autoHeight : true,
                backgroundImage : "/build/images/startButton.png",
                hover : {
                    alpha : 0.8
                }
            },
            events : {
                "click" : "goStartGame"
            }
        }
    ]
};