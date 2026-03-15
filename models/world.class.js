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
import { EndbossBar } from "./endboss-bar.class.js";
import { Coin } from "./coin.class.js";
import { CoinBar } from "./coin-bar.class.js";

export class World {
    character = new Character();
    healthBar = new StatusBar();
    throwableObjects = [];
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    collectibleBottles = [];
    collectedBottles = 0;
    collectedCoins = 0;
    collectibleCoins = [];
    coinBar = new CoinBar();
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
            this.checkBottleBossCollisions();
            this.checkCoinCollisions();
        }, 100);

        this.spawnRandomChicken();
        this.spawnBottles();
        this.spawnCoins();
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

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.collectibleBottles);
        this.addObjectsToMap(this.collectibleCoins);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.coinBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    if (!enemy.isDead && !this.character.isHurt()) {
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
                    this.character.speedY = 15;
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
                    this.endbossBar.isVisible = true;
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

            this.collectedBottles -= 5;

            this.bottleBar.setPercentage(this.collectedBottles);

            this.keyboard.D = false;
        }
    }

    checkBottleCollisions() {
        this.collectibleBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 100) {
                    this.collectedBottles += 5;
                    this.bottleBar.setPercentage(this.collectedBottles);
                    this.collectibleBottles.splice(index, 1);
                    console.log(
                        "Flasche gesammelt! Vorrat:",
                        this.collectedBottles / 20,
                    );
                }
            }
        });
    }

    checkBottleBossCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (
                    enemy instanceof Endboss &&
                    bottle.isColliding(enemy) &&
                    !bottle.broken
                ) {
                    bottle.splash();
                    enemy.bossHit();
                    bottle.x -= 10;
                }
            });
        });
    }

    checkCoinCollisions() {
        this.collectibleCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (this.collectedCoins < 100) {
                    this.collectedCoins += 5;
                    this.coinBar.setPercentage(this.collectedCoins);

                    this.collectibleCoins.splice(index, 1);

                    console.log(
                        "Gold gesammelt! Reichtum:",
                        this.collectedCoins / 20,
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
        for (let i = 0; i < 15; i++) {
            let x = 300 + Math.random() * 2200;
            let y = 330 + Math.random() * 40;

            this.collectibleBottles.push(new Bottle(x, y));
        }
    }

    spawnCoins() {
        this.collectibleCoins = [];

        for (let j = 0; j < 6; j++) {
            let startX = 600 + j * 700;

            for (let i = 0; i < 7; i++) {
                let x = startX + i * 50;
                let curveY = -(i - 3) * (i - 3) * 25;
                let y = 180 + curveY;

                this.collectibleCoins.push(new Coin(x, y));
            }
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
