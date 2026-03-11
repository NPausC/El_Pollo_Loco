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

    constructor() {
        super();
        this.loadCharacterImages();
        this.applyGravity();

        // Trennung der Bewegung und Animation in zwei Intervalle
        IntervalHub.startInterval(() => this.moveCharacter(), 1000 / 60);
        IntervalHub.startInterval(() => this.animateCharacter(), 100);
    }

    loadCharacterImages() {
        this.loadImage(ImageHub.CHARACTER.walk[0]);
        this.loadImages(ImageHub.CHARACTER.walk);
        this.loadImages(ImageHub.CHARACTER.jump);
        this.loadImages(ImageHub.CHARACTER.idle);
    }

    // 1. Logik für die Bewegung (Tastenabfrage)
    moveCharacter = () => {
        // Rechts rum
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }

        // Links rum
        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        // springen
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }

        // Kamera folgt dem Charakter
        this.world.camera_x = -this.x + 100;
    };

    animateCharacter = () => {
        if (this.isAboveGround()) {
            // Während des Springens
            this.playAnimation(ImageHub.CHARACTER.jump);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            // Während des Laufens
            this.playAnimation(ImageHub.CHARACTER.walk);
        } else {
            // stehen
            this.playAnimation(ImageHub.CHARACTER.idle);
        }
    };
}
