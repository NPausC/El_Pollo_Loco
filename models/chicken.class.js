class Chicken extends MovableObject{

    constructor() {
        super();
        this.loadImage(ImageHub.CHICKEN.normal_walk[0]);


        this.x = 200  + Math.random() * 500;
        this.y = 350
        this.height = 100
        this.width = 100
    }
}