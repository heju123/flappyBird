/**
 * Created by heju on 2017/7/14.
 */
export default class MainController extends window.Monk.Controller{
    constructor(panel) {
        super(panel);
    }

    mouseDown(e){
        console.log("main mouseDown!");
    }

    clickMain(e){
        console.log(e);
    }

    clickInput(e){
        console.log(e);
        e.stopPropagation();
    }

    mousedownInput(e){
        console.log("input mousedown");
    }

    changeRoute(e){
        let mainRoute = this.viewState.getComponentById("mainRoute");
        mainRoute.changeRoute("test");
    }
}