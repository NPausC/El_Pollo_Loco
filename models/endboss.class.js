import { ImageHub } from "../js/helpers/image-hub.js";
import { MovableObject } from "./movable-objects.class.js";

export class Endboss extends MovableObject {
    x = 3200;
    y = 55;
    height = 400;
    width = 250;

    constructor() {
        super();
        this.loadImage(ImageHub.ENDBOSS.walk[0]);
        this.loadImages(ImageHub.ENDBOSS.walk);
    } 

    // hier kommt die Anmiation
    animate = () => {
    };
}