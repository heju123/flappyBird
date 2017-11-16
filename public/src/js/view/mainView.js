import MainController from "../controller/mainController.js";
import route from "./route.js";

export default {
    controller : MainController,
    type: "rect",
    style: {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    },
    children : [
        {
            name : "bg",
            type : "rect",
            style : {
                x : 0,
                y : 0,
                width : "100%",
                height : "100%",
                layout : {
                    type : "linearLayout",
                    orientation : "horizontal"
                },
                zIndex : -1
            }
        },
        route
    ]
}