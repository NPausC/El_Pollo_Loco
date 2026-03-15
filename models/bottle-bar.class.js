import { StatusBar } from "./status-bar.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class BottleBar extends StatusBar {
    y = 50;

    constructor() {
        super();

        const bottleImages = ImageHub.STATUSBAR.bottle;

        if (bottleImages) {
            this.IMAGES = bottleImages;
            this.loadImages(this.IMAGES);
            this.setPercentage(0);
        }
    }
}
