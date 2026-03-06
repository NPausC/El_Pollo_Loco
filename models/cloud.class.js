class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 250;
    speed = 0.15;

    constructor() {
        super();
        this.loadImage(ImageHub.LAYERS.clouds[0]);

        this.x = Math.random() * 500;

        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    animate = () => {
        this.moveLeft();
    }
}
