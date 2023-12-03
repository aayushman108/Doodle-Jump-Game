// Platform class
class Platform {
    constructor(y) {
        this.width = PLATFORM_WIDTH;
        this.height = PLATFORM_HEIGHT;
        this.img = platformImg;
        this.x = Math.floor(Math.random() * CANVAS_WIDTH*3/4);
        this.y = y;
        this.color = "#009900";
        //this.speed = gameSpeed;
    }

    update() {

        // Move the platform upward
        //this.y -= this.speed;

        // Check if the platform is out of the canvas
        // if (this.y + this.height < 0) {
        //     this.reposition();
        // }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
