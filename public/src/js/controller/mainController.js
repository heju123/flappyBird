/**
 * Created by heju on 2017/7/14.
 */
import bgView from "../view/bgView.js";

export default class MainController extends window.plutojs.Controller{
    constructor(component) {
        super(component);

        this.registerEvent("$onViewLoaded", ()=>{
            //生成背景图片
            let bgCom;
            let bg = this.component.getComponentByName("bg");
            for (let i = 0; i < 3; i++)
            {
                bgCom = new window.plutojs.components.Rect(bg);
                bgCom.initCfg(bgView).then(((bgCom)=>{
                    return ()=>{
                        bg.appendChild(bgCom);
                    };
                })(bgCom));
            }
        });
    }

    goStartGame(){
        let mainRoute = this.viewState.getComponentById("mainRoute");
        mainRoute.changeRoute("game");
    }
}