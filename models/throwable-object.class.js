import { MovableObject } from "./movable-objects.class.js";
import { ImageHub } from "../js/helpers/image-hub.js";

export class ThrowableObject extends MovableObject {
    broken = false;

    constructor(x, y) {
        super();
        this.loadImage(ImageHub.BOTTLE.rotation[0]);
        this.loadImages(ImageHub.BOTTLE.rotation);
        this.loadImages(ImageHub.BOTTLE.splash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();

        let throwInterval = setInterval(() => {
            if (this.broken) {
                clearInterval(throwInterval);
                this.speedY = 0;
            } else if (this.y >= 350) {
                this.splash();
            } else {
                this.x += 8;
                this.playAnimation(ImageHub.BOTTLE.rotation);
            }
        }, 25);
    }

    splash() {
        this.broken = true;
        this.speedY = 0;
        this.playAnimation(ImageHub.BOTTLE.splash);
        setTimeout(() => {
            this.y = 5000;
        }, 200);
    }
}
