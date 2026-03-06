class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject(ImageHub.LAYERS.air[0], 0),
        new BackgroundObject(ImageHub.LAYERS.third_layer[0], 0),
        new BackgroundObject(ImageHub.LAYERS.second_layer[0], 0),
        new BackgroundObject(ImageHub.LAYERS.first_layer[0], 0),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
