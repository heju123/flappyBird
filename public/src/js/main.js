/**
 * Created by heju on 2017/7/19.
 */
import route from "./view/route.js";

class Main {
    constructor(){
        let mainBox = document.getElementById("mainBox");
        mainBox.style.width = "864px";
        mainBox.style.height = "512px";

        var monk = new window.monk.Main("mainBox");

        monk.run(route);
    }
}

let main = new Main();