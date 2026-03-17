import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-objects.class.js";

export class Character extends MovableObject {
    x = 0;
    y = 150;
    height = 280;
    width = 150;
    speed = 10;
    world;
    lastActionTime = new Date().getTime();

    constructor() {
        super();
        this.loadCharacterImages();
        this.applyGravity();
        this.offset = {
            top: 120,
            left: 30,
            right: 40,
            bottom: 10,
        };

        IntervalHub.startInterval(() => this.moveCharacter(), 1000 / 60);
        IntervalHub.startInterval(() => this.animateCharacter(), 100);
    }

    loadCharacterImages() {
        this.loadImage(ImageHub.CHARACTER.walk[0]);
        this.loadImages(ImageHub.CHARACTER.walk);
        this.loadImages(ImageHub.CHARACTER.jump);
        this.loadImages(ImageHub.CHARACTER.idle);
        this.loadImages(ImageHub.CHARACTER.long_idle);
        this.loadImages(ImageHub.CHARACTER.hurt);
        this.loadImages(ImageHub.CHARACTER.dead);
    }

    moveCharacter = () => {
        if (Keyboard.RIGHT || Keyboard.LEFT || Keyboard.SPACE || Keyboard.D) {
            this.lastActionTime = new Date().getTime();
        }
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }

        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }

        this.world.camera_x = -this.x + 100;
    };

    animateCharacter = () => {
        if (this.isDead()) {
            this.playAnimation(ImageHub.CHARACTER.dead);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.CHARACTER.hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(ImageHub.CHARACTER.jump);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.CHARACTER.walk);
        } else {
            this.playIdleAnimations();
        }
    };

    playIdleAnimations() {
        let timePassed = new Date().getTime() - this.lastActionTime;

        if (timePassed > 15000) {
            this.playAnimation(ImageHub.CHARACTER.long_idle);
        } else {
            this.playAnimation(ImageHub.CHARACTER.idle);
        }
    }
}
