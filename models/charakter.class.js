import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-objects.class.js";

export class Character extends MovableObject {
    currentImage = 0;

    x = 0;
    y = 80;
    height = 280;
    width = 150;
    speed = 10;

    world;

    constructor() {
        super();

        //lädt die erste Grafik
        this.loadImage(ImageHub.CHARACTER.walk[0]);

        //lädt alle Laufbilder in den imageCache
        this.loadImages(ImageHub.CHARACTER.walk);

        IntervalHub.startInterval(this.animate, 1000 / 60);
        this.applyGravity();
    }

    // Arrow-Syntax für HUB
    animate = () => {
        // 1. Logik für die Bewegung (x-Koordinate)
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.world.camera_x = -this.x + 200;
            this.otherDirection = false;
        }

        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.world.camera_x = -this.x + 200;
            this.otherDirection = true;
        }

        // 2. Logik für die Animation (Bilderwechsel)
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.CHARACTER.walk);
        } else {
            // Zeigt das Standbild, wenn er nichts tut
            this.loadImage(ImageHub.CHARACTER.walk[0]);
        }
    };

    jump() {}
}
