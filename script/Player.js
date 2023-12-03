// Player class
class Player {
    constructor() {
        this.width = DOODLER_WIDTH;
        this.height = DOODLER_HEIGHT;
        this.img = doodlerRightImg;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.jumpStrength = 15;
        this.velocityY = initialVelocityY;
        this.velocityX = 0;
        this.gravity = 0.4;
        this.isJumping = false;
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
    }

    update() {
        //update player horizontal position
        this.x += this.velocityX;

        if (this.x > canvas.width) {
            this.x = 0;
        }
        else if (this.x + this.width < 0) {
            this.x = canvas.width;
        }

        // Apply gravity and update player vertical position
        this.velocityY += this.gravity;
        this.y += this.velocityY;

    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
