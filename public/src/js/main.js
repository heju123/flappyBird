/**
 * Created by heju on 2017/7/19.
 */
import "plutojs";
import mainView from "./view/mainView.js";

class Main {
    constructor(){
        let mainBox = document.getElementById("mainBox");
        mainBox.style.width = "100%";
        mainBox.style.height = "100%";
        mainBox.style["max-width"] = "864px";
        mainBox.style["max-height"] = "512px";

        var monk = new window.plutojs.Main("mainBox");

        monk.run(mainView);
    }
}

let main = new Main();