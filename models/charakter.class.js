class Character extends MovableObject {
    currentImage = 0;

    constructor() {
        super();

        //lädt die erste Grafik
        this.loadImage(ImageHub.CHARACTER.walk[0]);

        //lädt alle Laufbilder in den imageCache
        this.loadImages(ImageHub.CHARACTER.walk);

        this.x = 0;
        this.y = 150;
        this.height = 280;
        this.width = 150;

        IntervalHub.startInterval(this.animate, 100);
    }

    // Arrow-Syntax für HUB
    animate = () => {
        this.playAnimation(ImageHub.CHARACTER.walk);
    };

    jump() {}
}
