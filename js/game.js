import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { IntervalHub } from "./helpers/intervall-hub.js";
import { level1 } from "./levels/level1.js";

let canvas;
let world;

function init() {
    canvas = document.getElementById("canvas");

    Keyboard.addEvents();

    IntervalHub.stopAllIntervals();
    world = new World(canvas, level1);
    window.world = world;
}

window.onload = () => {
    init();
};
