
/**
 * 
 * Constructor for the Player object
 * 
 * @param {type} unit
 * @returns {Player}
 */
function Player(unit){
    this.x = 0;
    this.y = 0;
    this.height = unit.getCalculatedHeight(2);
    this.width = unit.getCalculatedWidth(1);
    this.movement = [];
    this.normalizerRatio = 0.3;
    this.normalizer = unit.getCalculatedWidth(1) * this.normalizerRatio;
    this.velocity = 0;
    this.maxVelocity = unit.getCalculatedWidth(4);
    this.accelerationRatio = 0.5;
    this.acceleration = unit.getCalculatedWidth(1) * this.accelerationRatio;
    this.lift = 0;
    this.maxLift = -unit.getCalculatedWidth(5);
    this.jumping = false;
}

/**
 * Modifies the players current velocity by a negative number.
 * If the current velocity minus the player acceleration is less than the maximum negative velocity, set the current velocity to the maximum negative velocity
 * Otherwise add the negative value of acceleration to the current velocity
 */
Player.prototype.moveLeft = function(){
    this.velocity = this.velocity - this.acceleration < -this.maxVelocity ? this.velocity = -this.maxVelocity : this.velocity -= this.acceleration;
};

/**
 * Returns true if the player is currently moving left, otherwise returns false
 * 
 * @returns {Boolean}
 */
Player.prototype.movingLeft = function(){
    return this.velocity < 0;
};

/**
 * Modifies the players current velocity by a positive number.
 * If the current velocity plus the player acceleration is greater than the maximum velocity, set the current velocity to the maximum velocity
 * Otherwise add the value of acceleration to the current velocity
 */
Player.prototype.moveRight = function (){
    this.velocity = this.velocity + this.acceleration > this.maxVelocity ? this.velocity = this.maxVelocity : this.velocity += this.acceleration;
};

/**
 * Returns true if the player is currently moving right, otherwise returns false
 * 
 * @returns {Boolean}
 */
Player.prototype.movingRight = function(){
    return this.velocity > 0;
};

/**
 * If the player is not jumping, set the players lift to the maximum lift value, and set the jumping state to true
 */
Player.prototype.jump = function(){
    if(!this.jumping){
        this.lift = this.maxLift;
        this.jumping = true;
    }
};

/**
 * Check the movement array for keystrokes, running the movement related functions
 * if the keystrokes values are true
 */
Player.prototype.move = function(){
    //if left arrow key is pressed
    if(this.movement[37]){
        this.moveLeft();
    }
    //if right arrow key is pressed
    if(this.movement[39]){
        this.moveRight();
    }
    //if space bar is pressed
    if(this.movement[32]){
        this.jump();
    }
};

/**
 * Modify the Players X coordinate value by the current velocity divided by the normalizer
 *  
 * @returns the current X coordinate
 */
Player.prototype.currentX = function(){
    return this.x += (this.velocity/this.normalizer);
};

/**
 * Modify the Players Y coordinate value by the current lift divided by the normalizer
 *  
 * @returns the current Y coordinate
 */
Player.prototype.currentY = function(){
    return this.y += (this.lift/this.normalizer);
};

/**
 * Calculates what the next X coordinate will be after velocity is taken into account
 * 
 * @returns the next X coordinate
 */
Player.prototype.nextX = function(){
    return this.x + (this.velocity/this.normalizer);
};

/**
 * Calculates what the next Y coordinate will be after lift is taken into account
 * 
 * @returns the next Y coordinate
 */
Player.prototype.nextY = function(){
    return this.y + (this.lift/this.normalizer);
};

/**
 * Method used to stop the player from moving side-to-side, notable usage
 * when the player encounters a wall or other boundary. Sets the players X
 * coordinate based on the passed in xPosition, and sets the player velocity
 * to zero.
 * 
 * @param {type} xPosition - the X coordinate where the player is to stop
 */
Player.prototype.horizontalCollision = function(xPosition){
    this.x = xPosition;
    this.velocity = 0;
};

/**
 * Method used to stop the player from moving up, mainly used when the player
 * comes into contact with a worlds ceiling or bottom of a platform.
 * 
 * @param {type} yPosition - the y coordinate of the obstruction
 */
Player.prototype.verticalCollision = function(yPosition){
    this.y = yPosition;
    this.lift = 0;
};

/**
 * Method used to stop the player from moving down, notable usage
 * when the player encounters the floor or a platform. Sets the players Y
 * coordinate based on the passed in yPosition, sets the player lift
 * to zero and jumping to false
 * 
 * @param {type} yPosition - the Y coordinate where the player is to stop
 */
Player.prototype.land = function(yPosition){
    //-1 to ensure player is flush with the ground 
    //(without -1 the player is 1px through the bottom)
    this.y = yPosition-1;
    this.lift = 0;
    this.jumping = false;
};
