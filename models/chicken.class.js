import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Chicken extends MovableObject {
    x = 200 + Math.random() * 500;
    y = 330;
    height = 100;
    width = 100;
    speed = 0.5 + Math.random() * 0.25;

    constructor() {
        super();

        this.loadImage(ImageHub.CHICKEN.normal_walk[0]);
        this.loadImages(ImageHub.CHICKEN.normal_walk);

        IntervalHub.startInterval(this.animate, 100);

        IntervalHub.startInterval(this.move, 1000 / 60);
    }

    animate = () => {
        this.playAnimation(ImageHub.CHICKEN.normal_walk);
    };

    move = () => {
        this.moveLeft();
    };

    // Arrow-Syntax für den Hub nutzen
    animate = () => {
        this.playAnimation(ImageHub.CHICKEN.normal_walk);
    };
}
