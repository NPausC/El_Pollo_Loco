import { CollectibleObject } from "./collectible-object.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class Coin extends CollectibleObject {
    constructor(x, y) {
        super(x, y, ImageHub.COIN.coin[0]);
        this.loadImages(ImageHub.COIN.coin);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (ImageHub.COIN && ImageHub.COIN.coin) {
                this.playAnimation(ImageHub.COIN.coin);
            }
        }, 200);
    }
}
