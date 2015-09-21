

/**
 * 
 * @param {type} unit
 * @returns {undefined}
 */
function Platform(unit){
    this.length = GenerateLength() * unit.length;
    this.height = unit.height;
}


function GenerateLength(){
    return Math.floor((Math.random() * 6) + 2);
}
