import { Keyboard } from "../models/keyboard.class.js";
import { IntervalHub } from "./helpers/interval-hub.js";
import { World } from "../models/world.class.js";

import { Chicken } from "../models/chicken.class.js";
import { SmallChicken } from "../models/smallchicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { level1 } from "./levels/level1.js";

let canvas;
let world;
let isInitialized = false;

function init() {
    canvas = document.getElementById("canvas");

    if (!isInitialized) {
        Keyboard.addEvents();
        isInitialized = true;
    }

    world = new World(canvas, level1);
    window.world = world;
}

function resetLevelData() {
    level1.enemies = [new Chicken(), new SmallChicken(500), new Endboss()];
}

window.restartGame = () => {
    IntervalHub.stopAllIntervals();
    world.character.x = 120;
    world.character.y = 150;
    world.character.energy = 100;
    world.character.speedY = 0;
    world.healthBar.setPercentage(100);

    resetLevelData();
    world.gameOverScreen = null;
    world.statusScreen = null;
    document.getElementById("restart-btn").style.display = "none";

    init();
};

window.onload = () => {
    init();
};
