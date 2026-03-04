class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 250;


        constructor() {
        super();
        this.loadImage(ImageHub.LAYERS.clouds[0]);

        this.x = Math.random() * 500;
    
    }
}