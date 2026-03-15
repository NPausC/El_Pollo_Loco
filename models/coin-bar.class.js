import { StatusBar } from "./status-bar.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class CoinBar extends StatusBar {
    x = 500;
    y = 50;

    constructor() {
        super();
        this.IMAGES = ImageHub.STATUSBAR.coin;
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}
