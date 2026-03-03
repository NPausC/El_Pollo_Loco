class MovableObject {
    x = 120;
    y = 200;
    img;
    width = 100;
    height = 150;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {}

    moveLeft() {}
}
