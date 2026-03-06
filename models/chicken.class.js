class Chicken extends MovableObject{

    constructor() {
        super();

        this.loadImage(ImageHub.CHICKEN.normal_walk[0]);
        this.loadImages(ImageHub.CHICKEN.normal_walk);


        this.x = 200  + Math.random() * 500;
        this.y = 330;
        this.height = 100;
        this.width = 100;
        this.speed = 0.5 + Math.random() * 0.25;

        IntervalHub.startInterval(this.animate, 100);

        IntervalHub.startInterval(this.move, 1000 / 60);
    }

    animate = () => {
        this.playAnimation(ImageHub.CHICKEN.normal_walk);
    }

    move = () => {
        this.moveLeft();
    }

    // Arrow-Syntax für den Hub nutzen
    animate = () => {
        this.playAnimation(ImageHub.CHICKEN.normal_walk);
    }
}