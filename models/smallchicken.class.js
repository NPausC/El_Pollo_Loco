import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class SmallChicken extends Chicken {
    IMAGES_WALK = ImageHub.CHICKEN_SMALL.walk;
    IMAGES_DEAD = ImageHub.CHICKEN_SMALL.dead;

    height = 60;
    width = 60;
    y = 370;

    constructor(x) {
        super(x);

        this.offset = {
            top: -10,
            left: 0,
            right: 0,
            bottom: 0,
        };

        this.loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
    }
}
