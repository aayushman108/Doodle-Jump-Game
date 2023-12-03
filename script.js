
// Game variables
let canvas, ctx;
let player, platformArray;
let score = 0;
let gameSpeed = 1;
let gameOver = false;
let doodlerRightImg;
let doodlerLeftImg;
let platformImg;

const startAudio = new Audio('game_start.wav');
const runningAudio = new Audio('game_running.wav');
const endAudio = new Audio('game_end.wav');

// Initialize the game
function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.backgroundColor = "pink";

    doodlerRightImg = new Image();
    doodlerRightImg.src = "./doodler-right.png";

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./doodler-left.png";

    player = new Player();

    //creating platforms

    platformImg = new Image();
    platformImg.src = "./platform.png";

    placePlatform();

    //game start sound
    startAudio.play();

    // if(!gameOver){
    //     setInterval(() => runningAudio.play(), 1000/60);
    // }else if(gameOver){
    //     runningAudio.pause();
    //     endAudio.play();
    // }

    let intervalId = setInterval(() => {
        if(!gameOver){
            runningAudio.play();
        }else{
            clearInterval(intervalId);
            runningAudio.pause();
            endAudio.play();
        }
    }, 1000/60);

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
        if(player.y+ DOODLER_HEIGHT === platform.y){
            score++;
            console.log(score);
        }
        if(player.y > CANVAS_HEIGHT){
            gameOver = true;
        }
    });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    player.draw();
    platformArray.forEach(platform => platform.draw());


    updateScore();
    ctx.fillStyle = "blue";
    ctx.font = "18px sans-serif";
    ctx.fillText(`score: ${score}`, 15, 25);

    if(gameOver){
        ctx.fillText("Game Over: Press 'Space' to Restart", CANVAS_WIDTH/7, CANVAS_HEIGHT*7/8);
    }

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
        player.velocityX = -4;
        player.img = doodlerLeftImg;
    }
    if(e.code == "ArrowRight"){
        player.velocityX = 4;
        player.img = doodlerRightImg;
    }
    if(e.code == "ArrowUp"){
        player.velocityY = initialVelocityY;
    }
    if(e.code == "Space" && gameOver){
        player = new Player;
        gameOver = false;
        score = 0;
        placePlatform();
    }
}

function placePlatform(){
    platformArray = [];

    for (let i = 0; i < 8; i++) {
        let y = CANVAS_HEIGHT - 75*i - 150;
        let platform = new Platform(y);
        platformArray.push(platform);
    }
}

//update score
function updateScore(){
    return score;
}


// Start the game when the window loads
window.onload = startGame;
