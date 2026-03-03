let canvas;
let ctx;
let character = new Character();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    character.loadImage(ImageHub.Character.walk[0]);

    ctx.drawImage(
        character.img,
        character.x,
        character.y,
        character.width,
        character.height,
    );

    console.log('My character is', character)

}