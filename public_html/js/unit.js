
/**
 * Constructor for the Unit object
 * 
 * An object used as a standard unit of measurement that is relative to the size
 * of the passed canvas.
 * 
 * @param {type} canvas
 * @returns {undefined}
 */
function Unit(canvas){
    this.widthMultiplier = 40;
    this.heightMultiplier = 30;
    this.width = canvas.width / this.widthMultiplier;
    this.height = canvas.height / this.heightMultiplier;
    
}

Unit.prototype.getCalculatedWidth = function(numberOfUnits){
    return this.width * numberOfUnits;
};

Unit.prototype.getCalculatedHeight = function(numberOfUnits){
    return this.height * numberOfUnits;
};

Unit.prototype.getCanvasWidth = function(){
    return this.width * this.widthMultiplier;
};

Unit.prototype.getCanvasHeight = function(){
    return this.height * this.heightMultiplier;
};
