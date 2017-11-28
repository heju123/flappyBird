import GameController from "../controller/gameController.js";

export default {
    controller: GameController,
    type: "rect",
    style: {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    },
    children : [
        {
            id: "mainMap",
            type: "map",
            style: {
                x: 0,
                y: 0,
                backgroundColor: "#dbdbdb"
            },
            mapDataUrl: "/build/maps/flappyBird.map",
            terrainPolicy: {
                "block": {
                    backgroundColor: "#000000"
                }
            }
        }
    ]
}