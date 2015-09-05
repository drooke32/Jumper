//grab the canvas and set it's width/height to 80% of the window
var canvas = document.getElementById('mainCanvas');
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;
//get the canvas context
var ctx = canvas.getContext('2d'); 
//setup the player and it's starting co-ordinates
var player = {
    x:20,
    y:canvas.height-70,
    h:50,
    w:50,
    gravity:10,
    decel:10
};

var redraw = function(){
    //fill the canvas with white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(20, 20, canvas.width-40, canvas.height-40);

    //draw the player rectangle based on the stored player coordinates
    ctx.strokeRect(player.x, player.y, player.h, player.w);
    requestAnimationFrame(redraw);
};

function moveRight(){
    //if the right side of the player box is already at the rightmost edge of the canvas, don't move
    if(player.x + 20 > canvas.width - 70){
        return;
    }
    player.x = player.x + 20;
}
function moveLeft(){
    //if the right side of the player box is already at the leftmost edge of the canvas, don't move
    if(player.x === 20){
        return;
    }
    player.x = player.x - 20;
}
function jump(){
    player.y = player.y - 20;
}

function bindMovementKeys(){
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                moveLeft();
            break;

            case 39: // right
                moveRight();
            break;

            case 32: // space
                jump();
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    });
}

$(function(){
    bindMovementKeys();
    redraw();
});