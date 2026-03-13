import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Cloud extends MovableObject {
    y = 20;
    height = 400;
    width = 400;
    speed = 0.15;

    constructor() {
        super();
        let randomIndex = Math.floor(
            Math.random() * ImageHub.LAYERS.clouds.length,
        );
        this.loadImage(ImageHub.LAYERS.clouds[randomIndex]);
        this.x = Math.random() * 3000;
        this.speed = 0.1 + Math.random() * 0.2;
        IntervalHub.startInterval(() => this.animate(), 1000 / 60);
    }

    animate = () => {
        this.moveLeft();

        if (this.x + this.width < -100) {
            this.x = 800 + Math.random() * 500;
        }

        if (this.x + this.width < 0) {
            this.x = 2500;
            this.y = Math.random() * 50;
        }
    };
}
