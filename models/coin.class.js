import { CollectibleObject } from "./collectible-object.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class Coin extends CollectibleObject {
    constructor(x, y) {
        super(x, y, ImageHub.COIN.normal[0]);
        this.loadImages(ImageHub.COIN.normal);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageHub.COIN.normal);
        }, 200);
    }
}
