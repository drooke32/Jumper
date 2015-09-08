
/**
 * 
 * Recursive method used to draw the game on the canvas
 * 
 * @param {type} player
 * @param {type} world
 * @param {type} canvas
 * @param {type} ctx
 * @param {type} unit
 */
function draw(player, world, canvas, ctx, unit){
    //fill the canvas with white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //add a border around the canvas
    ctx.strokeRect(unit.getCalculatedWidth(1), unit.getCalculatedHeight(1), unit.getCanvasWidth() - unit.getCalculatedWidth(2), unit.getCanvasHeight() - unit.getCalculatedHeight(2));
    //check to make sure the player won't be moving off of the world
    world.validatePlayerPosition(player);
    //move the player then apply the world physics to the player    
    player.move();    
    world.applyPhysics(player);
    //draw the player
    ctx.strokeRect(player.currentX(), player.currentY(), player.width, player.height);    
    //wrap the callback function in an anon func so we can pass in parameters
    requestAnimationFrame(function(){draw(player,world, canvas, ctx, unit);});
};

/**
 * Bind the arrow and space keys to the player.movement array
 * Storing the keypresses in the player movement allows for the player
 * to move in more than 1 direction at a time (jump and side-to-side in particular)
 * 
 * @param {type} player
 */
function bindMovementKeys(player){
    //bind the keydown of left/right arrow and space to
    //set the corresponding keystroke value to true
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                player.movement[37] = true;
            break;

            case 39: // right
                player.movement[39] = true;
            break;

            case 32: // space
                player.movement[32] = true;
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    });
    //bind the keyup of left/right arrow and space to
    //set the corresponding keystroke value to false
    $(document).keyup(function(e) {
        switch(e.which) {
            case 37: // left
                player.movement[37] = false;
            break;

            case 39: // right
                player.movement[39] = false;
            break;

            case 32: // space
                player.movement[32] = false;
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    });
}

/**
 * Function used to place the passed in player at the appropriate starting spot
 * for the passed in world
 * 
 * @param {type} player
 * @param {type} world
 */
function placePlayerAtStart(player, world){
    player.x = world.getStartingX();
    player.y = world.getStartingY();
}

/**
 * 
 * Main game function used to create a player and a world, as well as setup the
 * canvas and get it's context. Places the player at the starting position
 * for the created world, binds the player movement keys and starts the
 * recursive redraw function.
 */
function startGame(){
    //grab the canvas and get it's context
    var canvas = document.getElementById('mainCanvas');
    canvas.width = window.innerWidth * .8;
    canvas.height = window.innerHeight * .8;
    var ctx = canvas.getContext('2d'); 
    //generate the player and the world
    var unit = new Unit(canvas);
    var player = new Player(unit);
    var world = new World(unit);
    placePlayerAtStart(player, world);
    bindMovementKeys(player);
    draw(player, world, canvas, ctx, unit);
}

/** 
 * Function to start the game on page load * 
 */
$(function(){
    startGame();    
});