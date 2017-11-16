/**
 * Created by heju on 2017/7/27.
 */
import startView from "./startView.js";
import gameView from "./gameView.js";

export default {
    id : "mainRoute",
    type : "route",
    routes : {
        "start" : {
            view : startView,
            default : true
        },
        "game" : {
            view : gameView
        }
    }
}