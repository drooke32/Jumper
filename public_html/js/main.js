//grab the canvas and set it's width/height to 80% of the window
var canvas = document.getElementById('mainCanvas');
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;
var normalizer = 10;
var leftBoundary = 20;
var rightBoundary = canvas.width - 70;
var bottomBoundary = canvas.height - 70;
var topBoundary = 70;
//get the canvas context
var ctx = canvas.getContext('2d'); 
//setup the player and it's starting co-ordinates
var player = {
    x: 20,
    y: canvas.height-70,
    h: 50,
    w: 50,
    velocity: 0,
    acceleration: 20,
    maxVelocity: 200,
    friction: 5,
    lift: 0,
    gravity: 50
};

/**
 * 
 * @returns {undefined}
 */
var redraw = function(){
    //fill the canvas with white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(20, 20, canvas.width-40, canvas.height-40);

    //draw the player rectangle based on the stored player coordinates
    validateCoordinates();
    ctx.strokeRect(currentXPosition(), currentYPosition(), player.h, player.w);
    physics();
    requestAnimationFrame(redraw);
};

/**
 * 
 * @returns {Number|normalizer|player.xplayer.velocity}
 */
function currentXPosition(){
    return player.x += (player.velocity/normalizer);
}

/**
 * 
 * @returns {player.yplayer.lift|Number|normalizer}
 */
function currentYPosition(){
    
    //once platforms are in, check if the y coordinate matches any of their areas
    //for now, just check if the y coordinate is greater than or = to floor
    if(player.y + (player.lift/normalizer) >= bottomBoundary){
        player.lift = 0;
        player.y = bottomBoundary;
    }
    return player.y += (player.lift/normalizer);
}

/**
 * 
 * @returns {undefined}
 */
function validateCoordinates(){
    if(player.x < leftBoundary){
        player.x = 20;
    }
    else if(player.x > rightBoundary){
        player.x = rightBoundary;
    }
}

/**
 * 
 * @returns {undefined}
 */
function moveRight(){
    //increase the players velocity to the right
    player.velocity = player.velocity + player.acceleration > player.maxVelocity ? player.velocity = player.maxVelocity : player.velocity += player.acceleration;
}

/**
 * 
 * @returns {undefined}
 */
function moveLeft(){
    //increase the players velocity to the left
    player.velocity = player.velocity - player.acceleration < -player.maxVelocity ? player.velocity = -player.maxVelocity : player.velocity -= player.acceleration;
}

/**
 * 
 * @returns {undefined}
 */
function jump(){
    player.lift = -500;
}

/**
 * 
 * @returns {undefined}
 */
function physics(){
    decelerate();
    gravity();
}

/**
 * 
 * @returns {undefined}
 */
function decelerate(){
    if (player.velocity > 0) {
        player.velocity -= player.friction;
    }else if(player.velocity < 0){
        player.velocity += player.friction;
    }else if(player.velocity < player.friction || player.velocity > -player.friction){
        player.velocity = 0;
    }
}

/**
 * 
 * @returns {undefined}
 */
function gravity(){
    player.lift += player.gravity;
}

/**
 * 
 * @returns {undefined}
 */
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