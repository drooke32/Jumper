
/**
 * Constructor for the World object
 * 
 * @param {type} unit - Standardized unit object used to determine relative width/height
 * @returns {World}
 */
function World(unit){
    this.leftBoundary = unit.getCalculatedWidth(1);
    this.rightBoundary = unit.getCanvasWidth() - unit.getCalculatedWidth(2);
    this.bottomBoundary = unit.getCanvasHeight() - unit.getCalculatedHeight(3);
    this.topBoundary = unit.getCalculatedHeight(1);
    this.gravityRatio = 0.5;
    this.frictionRatio = 0.25;
    this.gravity = unit.getCalculatedHeight(1) * this.gravityRatio;
    this.friction = unit.getCalculatedWidth(1) * this.frictionRatio;
}

/**
 * Method used to apply the Worlds physics to the passed in Player object
 * 
 * @param {type} player
 */
World.prototype.applyPhysics = function(player){
    this.applyFriction(player);
    this.applyGravity(player);
};

/**
 * Method used to apply the World friction to the passed in Player object
 * 
 * @param {type} player
 */
World.prototype.applyFriction = function(player){
    if (player.movingRight() && player.velocity > this.friction) {
        player.velocity -= this.friction;
    }else if(player.movingLeft() && player.velocity < this.friction){
        player.velocity += this.friction;
    }else if(player.velocity < this.friction || player.velocity > -this.friction){
        player.velocity = 0;
    }
};

/**
 * Method used to apply the World gravity to the passed in player
 * 
 * @param {type} player
 */
World.prototype.applyGravity = function(player){
    player.lift += this.gravity;
};

/**
 * Method used to check the players next location and ensure they don't move
 * off of the world.
 * 
 * @param {type} player
 * @returns {undefined}
 */
World.prototype.validatePlayerPosition = function(player){
    //check if the players next X coordinate will push them past the left 
    //boundary - if it does, stop the player from running at the left boundary
    if(player.nextX() < this.leftBoundary){
        player.horizontalCollision(this.leftBoundary);
    }
    
    //check if the players next X coordinate will push them past the right 
    //boundary - if it does, stop the player from running at the right boundary
    else if(player.nextX() > this.rightBoundary){
        player.horizontalCollision(this.rightBoundary);
    }
    
    //check if the players next Y coordinate will push them past the bottom 
    //boundary - if it does, land the player at the bottom boundary
    if(player.nextY() >= this.bottomBoundary){
        player.land(this.bottomBoundary);
    }
    
    else if(player.nextY() <= this.topBoundary){
        player.verticalCollision(this.topBoundary);
    }
    
};

/**
 * Method used to return the starting X coordinate for this world
 * 
 * @returns {Number}
 */
World.prototype.getStartingX = function(){
    return this.leftBoundary;
};

/**
 * Method used to return the starting Y coordinate for this world
 * 
 * @returns {type.height|Number}
 */
World.prototype.getStartingY = function(){
    return this.bottomBoundary;
};
