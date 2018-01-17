/**
 * Created by heju on 2017/7/14.
 */
export default class StartController extends window.plutojs.Controller{
    constructor(component) {
        super(component);
    }

    goStartGame(){
        let mainRoute = this.viewState.getComponentById("mainRoute");
        mainRoute.changeRoute("game");
    }
}