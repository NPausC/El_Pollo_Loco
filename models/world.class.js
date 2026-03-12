import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./charakter.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBar } from "./status-bar.class.js";

export class World {
    character = new Character();
    healthBar = new StatusBar();
    level;
    canvas;
    ctx;
    keyboard = Keyboard;
    camera_x = 0;

    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level;
        this.setWorld();
        IntervalHub.startInterval(() => {
            this.checkCollisions();
        }, 100);
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            // Kollisionsprüfung & Pepe ist gerade nicht in der Unverwundbarkeitsphase
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                 // hier wird Energie wird abgezogen
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
                // Konsole - funktioniert
                console.log("Autsch! Energie übrig:", this.character.energy);
            }
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // Fehlersuche start
        if (mo instanceof StatusBar) {
            console.log("StatusBar Image:", mo.img);
            console.log("StatusBar Position:", mo.x, mo.y, mo.width, mo.height);
        }
        // Fehlersuche ende

        if (
            mo instanceof Character ||
            mo instanceof Chicken ||
            mo instanceof Endboss
        ) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "2";
            this.ctx.strokeStyle = "blue";
            this.ctx.rect(
                mo.x + mo.offset.left,
                mo.y + mo.offset.top,
                mo.width - mo.offset.left - mo.offset.right,
                mo.height - mo.offset.top - mo.offset.bottom,
            );
            this.ctx.stroke();
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
