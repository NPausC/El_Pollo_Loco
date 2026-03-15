import { ImageHub } from "../js/helpers/image-hub.js";
import { IntervalHub } from "../js/helpers/interval-hub.js";
import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./charakter.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBar } from "./status-bar.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Bottle } from "./bottle.class.js";

export class World {
    character = new Character();
    healthBar = new StatusBar();
    throwableObjects = [];
    bottleBar = new BottleBar();
    collectibleBottles = [];
    collectedBottles = 0;
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
            this.checkThrowObjects();
            this.checkEndbossProximity();
            this.clearOldEnemies();
            this.checkBottleCollisions();
        }, 100);

        this.spawnRandomChicken();
        this.spawnBottles();
        this.draw();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.collectibleBottles);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.collectibleBottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    if (!this.character.isHurt()) {
                        this.character.hit(10);
                        this.healthBar.setPercentage(this.character.energy);
                        console.log(
                            "BOSS-TREFFER! Energie:",
                            this.character.energy,
                        );
                    }
                } else if (
                    this.character.isAboveGround() &&
                    this.character.speedY < 0 &&
                    !enemy.isDead
                ) {
                    enemy.die();
                    this.character.jump();
                } else if (!enemy.isDead && !this.character.isHurt()) {
                    this.character.hit(2);
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkEndbossProximity() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (Math.abs(this.character.x - enemy.x) < 500) {
                    enemy.hadFirstContact = true;
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100,
            );
            this.throwableObjects.push(bottle);

            this.collectedBottles -= 10;

            this.bottleBar.setPercentage(this.collectedBottles);

            this.keyboard.D = false;
        }
    }

    checkItemCollisions() {
        this.level.collectibleObjects.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item instanceof Bottle) {
                    this.collectBottle(index);
                } else if (item instanceof Coin) {
                    this.collectCoin(index);
                }
            }
        });
    }

    checkBottleCollisions() {
        this.collectibleBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 100) {
                    this.collectedBottles += 10;
                    this.bottleBar.setPercentage(this.collectedBottles);
                    this.collectibleBottles.splice(index, 1);
                    console.log(
                        "Flasche gesammelt! Vorrat:",
                        this.collectedBottles / 10,
                    );
                }
            }
        });
    }

    spawnChicken() {
        let spawnPosition;
        if (this.character.x < 1200) {
            spawnPosition = 1800;
        } else {
            spawnPosition = 2500;
        }

        let xWithOffset = spawnPosition + Math.random() * 300;
        let chicken = new Chicken(xWithOffset);

        chicken.world = this;
        this.level.enemies.push(chicken);
    }

    spawnRandomChicken() {
        let currentChickenCount = this.level.enemies.filter(
            (e) => e instanceof Chicken,
        ).length;

        if (!this.character.isDead() && currentChickenCount < 10) {
            this.spawnChicken();
        }

        let nextSpawn = 2500 + Math.random() * 2500;
        setTimeout(() => {
            this.spawnRandomChicken();
        }, nextSpawn);
    }

    spawnBottles() {
        for (let i = 0; i < 10; i++) {
            let x = 400 + i * 450 + Math.random() * 200;
            let y = 330 + Math.random() * 40;

            this.collectibleBottles.push(new Bottle(x, y));
        }
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

        if (mo instanceof StatusBar) {
        }

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

    clearOldEnemies() {
        this.level.enemies = this.level.enemies.filter((enemy) => {
            return enemy.x > -100 && enemy.y > -500;
        });
    }
}
