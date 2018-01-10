/**
 * Created by heju on 2017/7/14.
 */
import birdAction from "../view/birdAction.js";

export default class GameController extends window.monk.Controller{
    constructor(component) {
        super(component);

        const SPEED = 1;

        this.registerEvent("$onViewLoaded", ()=>{
            this.mapView = this.component.getComponentById("mainMap");

            this.bird = this.component.getComponentByName("bird");
            this.bird.onCollision = (data)=>{
                console.log(data);
            };
            this.setBirdAction(birdAction.right_normal);

            window.monk.commonUtil.createImageDom("/build/images/tube.png").then((imgThis)=>{
                this.tubeImageDom = imgThis;
            });

            this.mapView.registerEvent("keydown", (e)=>{console.log(e.keyCode);
                switch (e.keyCode)
                {
                    case 87 : //w
                        this.bird.ySpeed = -SPEED;
                        this.setBirdAction(birdAction.right_up);
                        break;
                    case 83 : //s
                        this.bird.ySpeed = SPEED;
                        this.setBirdAction(birdAction.right_down);
                        break;
                    default : break;
                }
            });
            this.mapView.registerEvent("keyup", (e)=>{
                switch (e.keyCode)
                {
                    case 87 : //w
                    case 83 : //s
                        this.bird.ySpeed = 0;
                        this.setBirdAction(birdAction.right_normal);
                        break;
                    default : break;
                }
            });
        });
    }

    setBirdAction(action){
        if (action)
        {
            this.currentAction = action;
        }

        this.bird.setStyle({
            "width" : this.currentAction.width,
            "height" : this.currentAction.height,
            "backgroundImages" : this.currentAction.backgroundImages,
            "backgroundImagesInterval" : this.currentAction.backgroundImagesInterval
        });
    }

    draw(ctx) {
        if (!this.mapView || !this.mapView.mapData || !this.tubeImageDom)
        {
            return;
        }
        for (let row = 0; row < this.mapView.mapHeight; row++)
        {
            for (let col = 0; col < this.mapView.mapWidth; col++)
            {
                if (this.mapView.mapData[row][col].terrain == 1)
                {
                    ctx.drawImage(this.tubeImageDom, this.mapView.getRealX() + col * this.mapView.mapSize,
                        this.mapView.getRealY() + row * this.mapView.mapSize
                        - this.tubeImageDom.naturalHeight + parseInt(this.mapView.mapSize, 10),
                        this.tubeImageDom.width, this.tubeImageDom.height);
                }
                else if (this.mapView.mapData[row][col].terrain == 2)
                {
                    ctx.save();
                    let transX = this.mapView.getRealX() + col * this.mapView.mapSize
                        + this.tubeImageDom.naturalWidth / 2;
                    let transY = this.mapView.getRealY() + row * this.mapView.mapSize
                        + this.tubeImageDom.naturalHeight / 2;
                    ctx.translate(transX, transY);
                    ctx.scale(1, -1);
                    ctx.translate(-transX, -transY);

                    ctx.drawImage(this.tubeImageDom, this.mapView.getRealX() + col * this.mapView.mapSize,
                        this.mapView.getRealY() + row * this.mapView.mapSize,
                        this.tubeImageDom.width, this.tubeImageDom.height);
                    ctx.restore();
                }
            }
        }
    }
}