class Character extends MovableObject {

constructor() {
        super();
        this.loadImage(ImageHub.CHARACTER.walk[0]);

        this.x = 0
        this.y = 150
        this.height = 300
        this.width = 150
    

    }

    jump(){

    }
}