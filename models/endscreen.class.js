import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class EndScreen extends DrawableObject {
    width = 400;
    height = 300;

    constructor(type) {
        super();
        this.x = (720 - this.width) / 2;
        this.y = (480 - this.height) / 2;

        if (type === "lost") {
            this.loadImage(ImageHub.YWYL.you_lost[0]);
        } else if (type === "game_over") {
            this.loadImage(ImageHub.YWYL.game_over[0]);
        }
    }
}
