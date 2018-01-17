/**
 * Created by heju on 2017/7/19.
 */
import "plutojs";
import mainView from "./view/mainView.js";

class Main {
    constructor(){
        let mainBox = document.getElementById("mainBox");
        mainBox.style.width = "864px";
        mainBox.style.height = "512px";

        var monk = new window.plutojs.Main("mainBox");

        monk.run(mainView);
    }
}

let main = new Main();