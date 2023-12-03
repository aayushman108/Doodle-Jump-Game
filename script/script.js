
// Game variables
let canvas, ctx;
let player, platformArray;
let score = 0;
let gameSpeed = 1;
let gameOver = false;
let doodlerRightImg;
let doodlerLeftImg;
let platformImg;

const startAudio = new Audio('../assets/game_start.wav');
const runningAudio = new Audio('../assets/game_running.wav');
const endAudio = new Audio('../assets/game_end.wav');
canvas = document.getElementById("canvas");


// Initialize the game
function startGame() {
    //canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.backgroundColor = "pink";

    //creating player or doodler
    doodlerRightImg = new Image();
    doodlerRightImg.src = "../assets/doodler-right.png";

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "../assets/doodler-left.png";

    player = new Player();

    //creating platforms

    platformImg = new Image();
    platformImg.src = "../assets/platform.png";

    //Place platform
    placePlatform();

    //game sound
    gameSound();

    //first jump
    player.jump();

    // Set up event listeners for controls
    document.addEventListener("keydown", moveDoodler);

    // Start the game loop
    updateGame();
}

// Game loop
function updateGame() {
    
    player.update();

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
            player.velocityY = -VELOCITY_Y;
            player.velocityX = 0;
        }
        if(player.y+ DOODLER_HEIGHT === platform.y){
            score++;
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

    //Score
    ctx.fillStyle = "blue";
    ctx.font = "18px sans-serif";
    ctx.fillText(`score: ${score}`, 15, 25);

    //Game over and Restart the game
    if(gameOver){
        ctx.fillText("Game Over: Press 'Space' to Restart", CANVAS_WIDTH/7, CANVAS_HEIGHT*7/8);
    }

    requestAnimationFrame(updateGame);
}

// Handle player jump
function moveDoodler(e) {
    //player.jump();
    if(e.code == "ArrowLeft"){
        player.velocityX = -VELOCITY_X;
        player.img = doodlerLeftImg;
    }
    if(e.code == "ArrowRight"){
        player.velocityX = VELOCITY_X;
        player.img = doodlerRightImg;
    }
    if(e.code == "ArrowUp"){
        player.velocityY = -VELOCITY_Y;
    }
    if(e.code == "Space" && gameOver){
        player = new Player;
        gameOver = false;
        score = 0;
        player.jump();
        placePlatform();
        gameSound();
    }
}

//Place platform
function placePlatform(){
    platformArray = [];

    for (let i = 0; i < 8; i++) {
        let y = CANVAS_HEIGHT - 75*i - random(120, 160);
        let platform = new Platform(y);
        platformArray.push(platform);
    }
}


//Game Sound
function gameSound(){
    startAudio.play();

    let intervalId = setInterval(() => {
        if(!gameOver){
            runningAudio.play();
        }else{
            clearInterval(intervalId);
            runningAudio.pause();
            endAudio.play();
        }
    }, 1000/60);
}

// Start the game

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    canvas.style.display = "block";
    setTimeout(()=> startGame(), 1000);
    startButton.style.display = "none";
});

