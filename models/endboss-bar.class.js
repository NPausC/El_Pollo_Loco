import { StatusBar } from "./status-bar.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class EndbossBar extends StatusBar {
    x = 500;
    y = 10;
    isVisible = false;

    draw(ctx) {
        if (this.isVisible) {
            super.draw(ctx);
        }
    }

    constructor() {
        super();
        this.IMAGES = ImageHub.STATUSBAR.endboss;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
