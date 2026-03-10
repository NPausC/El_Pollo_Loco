import { MovableObject } from "./movable-objects.class";

export class Endboss extends MovableObject {
    x = 200 + Math.random() * 500;
    y = 330;
    height = 100;
    width = 100;

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
