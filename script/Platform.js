// Platform class
class Platform {
    constructor(y) {
        this.width = PLATFORM_WIDTH;
        this.height = PLATFORM_HEIGHT;
        this.img = platformImg;
        this.x = Math.floor(Math.random() * CANVAS_WIDTH*3/4);
        this.y = y;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
