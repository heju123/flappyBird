/**
 * Created by heju on 2017/7/14.
 */
import bgView from "../view/bgView.js";

export default class MainController extends window.monk.Controller{
    constructor(component) {
        super(component);

        this.registerEvent("$onViewLoaded", ()=>{
            //生成背景图片
            let bgCom;
            for (let i = 0; i < 3; i++)
            {
                bgCom = new window.monk.components.Rect(this.component);
                bgCom.initCfg(bgView).then(((bgCom)=>{
                    return ()=>{
                        this.component.appendChildren(bgCom);
                    };
                })(bgCom));
            }
        });
    }
}