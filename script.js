//creating canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.createContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function animate(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
}

animate();