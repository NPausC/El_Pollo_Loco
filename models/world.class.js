import { IntervalHub } from "../js/helpers/interval-hub.js";
import { Character } from "./charakter.class.js";
import { Chicken } from "./chicken.class.js";
import { SmallChicken } from "./smallchicken.class.js";
import { Endboss } from "./endboss.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Keyboard } from "./keyboard.class.js";
import { StatusBar } from "./status-bar.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Bottle } from "./bottle.class.js";
import { EndbossBar } from "./endboss-bar.class.js";
import { Coin } from "./coin.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndScreen } from "./endscreen.class.js";

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
    gameOverScreen = null;
    statusScreen = null;

    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level;
        this.setWorld();
        IntervalHub.startInterval(() => {
            if (!this.statusScreen && !this.gameOverScreen) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkEndbossProximity();
                this.clearOldEnemies();
                this.checkBottleCollisions();
                this.checkBottleBossCollisions();
                this.checkCoinCollisions();
            }
            this.checkGameOver();
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

        if (!this.statusScreen && !this.gameOverScreen) {
            this.addToMap(this.healthBar);
            this.addToMap(this.bottleBar);
            this.addToMap(this.endbossBar);
            this.addToMap(this.coinBar);
        }

        if (this.statusScreen) {
            this.addToMap(this.statusScreen);
        }

        if (this.gameOverScreen) {
            this.addToMap(this.gameOverScreen);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                let fallsOnEnemy = this.character.speedY < 0;
                if (enemy instanceof Endboss) {
                    this.handleBossCollision(enemy);
                } else if (fallsOnEnemy && !enemy.isDead) {
                    enemy.die();
                    this.character.jump();
                } else if (!enemy.isDead && !this.character.isHurt()) {
                    this.handleEnemyHit(enemy);
                }
            }
        });
    }

    handleEnemyHit(enemy) {
        let damage = 5;
        if (enemy.constructor.name === "SmallChicken") {
            damage = 2;
        }

        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
        console.log(
            enemy.constructor.name + " hat getroffen! Schaden:",
            damage,
        );
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
                    console.log("Gold gesammelt:", this.collectedCoins / 20);
                }
            }
        });
    }

    checkGameOver() {
        let boss = this.level.enemies.find((e) => e instanceof Endboss);

        if (
            this.character.isDead() &&
            !this.statusScreen &&
            !this.gameOverScreen
        ) {
            this.executeGameOverSequence("lost");
        }
        if (boss && boss.isDead && !this.statusScreen && !this.gameOverScreen) {
            this.executeGameOverSequence("win");
        }
    }

    executeGameOverSequence(result) {
        if (this.statusScreen || this.gameOverScreen) return;
        this.statusScreen = new EndScreen(result);

        setTimeout(() => {
            IntervalHub.stopAllIntervals();
        }, 1000);

        setTimeout(() => {
            this.clearLevel();
        }, 2000);

        setTimeout(() => {
            this.statusScreen = null;
            this.gameOverScreen = new EndScreen("game_over");
            document.getElementById("restart-btn").style.display = "block";
        }, 5000);
    }

    clearLevel() {
        this.level.enemies = [];
        this.level.clouds = [];
        this.throwableObjects = [];
        this.collectibleBottles = [];
        this.collectibleCoins = [];
        this.character.y = -2000;
        this.character.x = -2000;
    }

    spawnChicken() {
        let spawnPosition = this.character.x < 1200 ? 1800 : 2500;
        let xWithOffset = spawnPosition + Math.random() * 300;
        let chicken;
        if (Math.random() > 0.3) {
            chicken = new Chicken(xWithOffset);
        } else {
            chicken = new SmallChicken(xWithOffset);
        }

        chicken.world = this;
        this.level.enemies.push(chicken);
    }

    spawnRandomChicken() {
        if (
            this.statusScreen ||
            this.gameOverScreen ||
            this.character.isDead()
        ) {
            return;
        }

        let currentChickenCount = this.level.enemies.filter(
            (e) =>
                e instanceof Chicken || e.constructor.name === "SmallChicken",
        ).length;

        if (currentChickenCount < 10) {
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
            if (!this.statusScreen && !this.gameOverScreen) {
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
