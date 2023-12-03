
// Game variables
let canvas, ctx;
let player, platformArray;
let score = 0;
let gameSpeed = 1;

// Initialize the game
function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.border = "2px solid black";

    player = new Player();

    //creating platforms
    platformArray = [];

    for (let i = 0; i < 8; i++) {
        let y = CANVAS_HEIGHT - 75*i - 150;
        let platform = new Platform(y);
        platformArray.push(platform);
    }

    // Set up event listeners for controls
    document.addEventListener("keydown", moveDoodler);

    // Start the game loop
    updateGame();
}

// Game loop
function updateGame() {
    // Update game elements
    player.update();
    //platformArray.forEach(platform => platform.update());

    //Check for collisions
    platformArray.forEach(platform => {
        if (player.velocityY < 0 && player.y < CANVAS_HEIGHT) {
            platform.y -= -2; //slide platform down
        }
        if(platform.y >= CANVAS_HEIGHT){
            platformArray.shift();
            let y = -PLATFORM_HEIGHT;
            platformArray.push(new Platform(y));
        }
        if (collisionDetection(player, platform)) {
            player.y = platform.y - player.height;
            player.velocityY = initialVelocityY;
            player.velocityX = 0;
        }
    });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    player.draw();
    platformArray.forEach(platform => platform.draw());

    // updateScore();

    // Update score
    // score++;
    // document.getElementById("score").innerText = "Score: " + Math.floor(score / 10);

    // Increase game speed for progressive difficulty
    // gameSpeed += 0.001;

    // Continue the game loop
    requestAnimationFrame(updateGame);
}

// Handle player jump
function moveDoodler(e) {
    player.jump();
    if(e.code == "ArrowLeft"){
        player.velocityX = -1;
    }
    if(e.code == "ArrowRight"){
        player.velocityX = 1;
    }
    if(e.code == "ArrowUp"){
        player.velocityY = initialVelocityY;
    }
}

//update score
// function updateScore(){
//     let points = Math.floor( 50*Math.random());
//     if(player.velocityX )
// }


// Start the game when the window loads
window.onload = startGame;
