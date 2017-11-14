/**
 * Created by heju on 2017/7/27.
 */
import mainView from "./mainView.js";

export default {
    id : "mainRoute",
    type : "route",
    routes : {
        "main" : {
            view : mainView,
            default : true
        }
    }
}