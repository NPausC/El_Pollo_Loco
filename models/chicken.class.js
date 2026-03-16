import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Chicken extends MovableObject {
    isDead = false;
    y = 330;
    height = 100;
    width = 100;

    constructor(x) {
        super();
        this.isDead = false;
        this.loadImage(ImageHub.CHICKEN.normal_walk[0]);
        this.loadImages(ImageHub.CHICKEN.normal_walk);
        this.offset = {
            top: 20,
            left: 10,
            right: 10,
            bottom: 20,
        };

        if (x !== undefined) {
            this.x = x;
        } else {
            this.x = 500 + Math.random() * 3000;
        }
        this.speed = 0.15 + Math.random() * 0.45;

        IntervalHub.startInterval(() => this.animate(), 200);
        IntervalHub.startInterval(() => this.move(), 1000 / 60);
    }

    animate = () => {
        if (!this.isDead) {
            this.playAnimation(ImageHub.CHICKEN.normal_walk);
        } else {
            this.loadImage(ImageHub.CHICKEN.normal_dead[0]);
        }
    };

    move = () => {
        if (!this.isDead) {
            this.moveLeft();
        }
    };

    die() {
        this.isDead = true;
        this.loadImage(ImageHub.CHICKEN.normal_dead[0]);
        this.speed = 0;
        setTimeout(() => {
            this.y = -1000;
        }, 2000);
    }
}
