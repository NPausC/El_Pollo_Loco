import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 100;

    constructor(x) {
        super();
        this.loadImage(ImageHub.CHICKEN.normal_walk[0]);
        this.loadImages(ImageHub.CHICKEN.normal_walk);

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
        this.playAnimation(ImageHub.CHICKEN.normal_walk);
    };

    move = () => {
        this.moveLeft();
    };
}
