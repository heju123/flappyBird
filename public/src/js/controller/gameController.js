/**
 * Created by heju on 2017/7/14.
 */
export default class GameController extends window.monk.Controller{
    constructor(component) {
        super(component);

        this.registerEvent("$onViewLoaded", ()=>{
            this.mapView = this.component.getComponentById("mainMap");

            window.monk.commonUtil.createImageDom("/build/images/tube.png").then((imgThis)=>{
                this.tubeImageDom = imgThis;
            });
        });
    }

    draw(ctx) {
        if (!this.mapView || !this.mapView.mapData)
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
                        this.mapView.getRealY() + row * this.mapView.mapSize,
                        this.tubeImageDom.width, this.tubeImageDom.height);
                }
            }
        }
    }
}