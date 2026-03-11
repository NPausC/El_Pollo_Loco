import { Chicken } from "/models/chicken.class.js";
import { Endboss } from "/models/endboss.class.js";
import { Cloud } from "/models/cloud.class.js";
import { BackgroundObject } from "/models/background-object.class.js";
import { ImageHub } from "../helpers/image-hub.js";
import { Level } from "/models/level.class.js";

export const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

    [new Cloud()],

    [
        new BackgroundObject(ImageHub.LAYERS.air[0], -719),
        new BackgroundObject(ImageHub.LAYERS.third_layer[1], -719),
        new BackgroundObject(ImageHub.LAYERS.second_layer[1], -719),
        new BackgroundObject(ImageHub.LAYERS.first_layer[1], -719),
        new BackgroundObject(ImageHub.LAYERS.air[0], 0),
        new BackgroundObject(ImageHub.LAYERS.third_layer[0], 0),
        new BackgroundObject(ImageHub.LAYERS.second_layer[0], 0),
        new BackgroundObject(ImageHub.LAYERS.first_layer[0], 0),
        new BackgroundObject(ImageHub.LAYERS.air[0], 719),
        new BackgroundObject(ImageHub.LAYERS.third_layer[1], 719),
        new BackgroundObject(ImageHub.LAYERS.second_layer[1], 719),
        new BackgroundObject(ImageHub.LAYERS.first_layer[1], 719),
        new BackgroundObject(ImageHub.LAYERS.air[0], 719 * 2),
        new BackgroundObject(ImageHub.LAYERS.third_layer[0], 719 * 2),
        new BackgroundObject(ImageHub.LAYERS.second_layer[0], 719 * 2),
        new BackgroundObject(ImageHub.LAYERS.first_layer[0], 719 * 2),
        new BackgroundObject(ImageHub.LAYERS.air[0], 719 * 3),
        new BackgroundObject(ImageHub.LAYERS.third_layer[1], 719 * 3),
        new BackgroundObject(ImageHub.LAYERS.second_layer[1], 719 * 3),
        new BackgroundObject(ImageHub.LAYERS.first_layer[1], 719 * 3),
        new BackgroundObject(ImageHub.LAYERS.air[0], 719 * 4),
        new BackgroundObject(ImageHub.LAYERS.third_layer[0], 719 * 4),
        new BackgroundObject(ImageHub.LAYERS.second_layer[0], 719 * 4),
        new BackgroundObject(ImageHub.LAYERS.first_layer[0], 719 * 4),
    ],
);
