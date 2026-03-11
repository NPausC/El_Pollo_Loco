import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Endboss extends MovableObject {
    x = 2900;
    y = 140;
    height = 300;
    width = 300;
    speed = 0.5 + Math.random() * 0.5;
    limit_left = 2900;
    limit_right = 3200;

    constructor() {
        super();
        this.loadImage(ImageHub.ENDBOSS.walk[0]);
        this.loadImages(ImageHub.ENDBOSS.walk);

        IntervalHub.startInterval(() => this.animate(), 200);
        IntervalHub.startInterval(() => this.move(), 1000 / 60);
    }

    animate = () => {
        this.playAnimation(ImageHub.ENDBOSS.walk);
    };

    move = () => {
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }

        this.checkPatrolLimits();
    };

    checkPatrolLimits() {
        if (this.x <= this.limit_left) {
            this.otherDirection = true;
        } else if (this.x >= this.limit_right) {
            this.otherDirection = false;
        }
    }
}
