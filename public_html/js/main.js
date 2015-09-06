//grab the canvas and set it's width/height to 80% of the window
var canvas = document.getElementById('mainCanvas');
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;
var leftBoundary = 20;
var rightBoundary = canvas.width - 70;
var bottomBoundary = canvas.height - 70;
var topBoundary = 70;
var keys = [];
//get the canvas context
var ctx = canvas.getContext('2d'); 
//setup the player and it's starting co-ordinates
var player = {
    x: 20,
    y: canvas.height-70,
    h: 50,
    w: 50,
    normalizer: 10,
    velocity: 0,
    acceleration: 15,
    maxVelocity: 150,
    friction: 10,
    lift: 0,
    gravity: 15,
    maxLift: -200,
    jumping: false,
    validatePosition: function(leftBoundary, rightBoundary){
      if((this.x + (this.velocity/this.normalizer)) < leftBoundary){
        this.x = 20;
        this.velocity = 0;
        }
        else if((this.x + (this.velocity/this.normalizer)) > rightBoundary){
            this.x = rightBoundary;
            this.velocity = 0;
        }  
    },
    moveLeft: function(){
        this.velocity = this.velocity - this.acceleration < -this.maxVelocity ? this.velocity = -this.maxVelocity : this.velocity -= this.acceleration;
    },
    moveRight: function(){
        this.velocity = this.velocity + this.acceleration > this.maxVelocity ? this.velocity = this.maxVelocity : this.velocity += this.acceleration;
    },
    jump: function(){
        //only jump while they're not already jumping or falling
    if(this.lift === this.gravity && !this.jumping){
        this.lift = this.maxLift;
        this.jumping = true;
    }
    },
    move: function(leftBoundary,rightBoundary){
        this.validatePosition(leftBoundary, rightBoundary);
        if(keys[37]){
            this.moveLeft();
        }
        if(keys[39]){
            this.moveRight();
        }
        if(keys[32]){
            this.jump();
        }
    },
    currentX: function(){
        return this.x += (this.velocity/this.normalizer);
    },
    currentY: function(bottomBoundary){
       //once platforms are in, check if the y coordinate matches any of their areas
        //for now, just check if the y coordinate is greater than or = to floor
        if(this.y + (this.lift/this.normalizer) >= bottomBoundary){
            this.lift = 0;
            this.y = bottomBoundary;
            this.jumping = false;
        }
        return this.y += (this.lift/this.normalizer); 
    },
    physics: function(){
        this.applyFriction();
        this.applyGravity();
    },
    applyFriction: function(){
        if (this.velocity > 0) {
            this.velocity -= this.friction;
        }else if(this.velocity < 0){
            this.velocity += this.friction;
        }else if(this.velocity < this.friction || this.velocity > -this.friction){
            this.velocity = 0;
        }
    },
    applyGravity: function(){
        this.lift += this.gravity;
    }
    
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
    player.move(leftBoundary, rightBoundary);
    ctx.strokeRect(player.currentX(), player.currentY(bottomBoundary), player.h, player.w);
    player.physics();
    requestAnimationFrame(redraw);
};

/**
 * 
 * @returns {undefined}
 */
function bindMovementKeys(){
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                keys[37] = true;
            break;

            case 39: // right
                keys[39] = true;
            break;

            case 32: // space
                keys[32] = true;
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    });
    $(document).keyup(function(e) {
        switch(e.which) {
            case 37: // left
                keys[37] = false;
            break;

            case 39: // right
                keys[39] = false;
            break;

            case 32: // space
                keys[32] = false;
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