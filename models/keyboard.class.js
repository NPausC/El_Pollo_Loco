export class Keyboard {
    static SPACE = false;
    static RIGHT = false;
    static LEFT = false;
    static D = false;

    static addEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.key == " ") Keyboard.SPACE = true;
            if (e.key == "ArrowRight") Keyboard.RIGHT = true;
            if (e.key == "ArrowLeft") Keyboard.LEFT = true;
            if (e.key == "d") Keyboard.D = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.key == " ") Keyboard.SPACE = false;
            if (e.key == "ArrowRight") Keyboard.RIGHT = false;
            if (e.key == "ArrowLeft") Keyboard.LEFT = false;
            if (e.key == "d") Keyboard.D = false;
        });
    }
}
