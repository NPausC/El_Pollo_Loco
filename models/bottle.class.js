import { CollectibleObject } from "./collectible-object.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class Bottle extends CollectibleObject {
    constructor(x, y) {
        const images = ImageHub.BOTTLE.onground;

        const randomIndex = Math.floor(Math.random() * images.length);

        super(x, y, images[randomIndex]);

        this.height = 70;
        this.width = 70;
        this.otherDirection = false;

        this.offset = { top: 10, left: 20, right: 20, bottom: 10 };
    }
}
