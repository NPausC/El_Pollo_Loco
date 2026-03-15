import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Endboss extends MovableObject {
    x = 2950;
    y = 140;
    height = 300;
    width = 300;
    speed = 0.5 + Math.random() * 0.5;
    limit_left = 2700;
    limit_right = 2950;

    constructor() {
        super();
        this.loadImage(ImageHub.ENDBOSS.walk[0]);
        this.loadImages(ImageHub.ENDBOSS.walk);
        this.loadImages(ImageHub.ENDBOSS.alert);
        this.loadImages(ImageHub.ENDBOSS.attack);

        this.animate();

        IntervalHub.startInterval(() => this.move(), 1000 / 60);
    }

    hadFirstContact = false;

    animate() {
        IntervalHub.startInterval(() => {
            let distance = Math.abs(this.x - this.world.character.x);

            if (distance < 200) {
                this.playAnimation(ImageHub.ENDBOSS.attack);
            } else if (this.hadFirstContact) {
                this.playAnimation(ImageHub.ENDBOSS.alert);
            } else {
                this.playAnimation(ImageHub.ENDBOSS.walk);
            }
        }, 200);
    }
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
