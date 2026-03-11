import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 250;
    speed = 0.15;

    constructor() {
        super();
        this.loadImage(ImageHub.LAYERS.clouds[0]);
        this.x = Math.random() * 500;
        IntervalHub.startInterval(() => this.animate(), 1000 / 60);
    }

    animate = () => {
        this.moveLeft();
    };
}
