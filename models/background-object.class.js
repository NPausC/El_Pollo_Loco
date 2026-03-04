class BackgroundObject extends MovableObject {

width = 720;
height = 420;

constructor(x, y) {
        super();
        this.loadImage(ImageHub.LAYERS.first_layer[0]);
        this.x = x;
        this.y = y;

}}