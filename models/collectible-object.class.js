import { MovableObject } from "./movable-objects.class.js";

export class CollectibleObject extends MovableObject {
    height = 70;
    width = 70;

    constructor(x, y, imagePath) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.offset = { top: 10, left: 20, right: 20, bottom: 10 };
    }
}
