/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewID : function() {
    return this._nextID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var ID = entity.getID();
    entity["posX"] = pos.posX;
    entity["posY"] = pos.posY;
    //entity["radius"]= entity.getRadius();

    this._entities.splice(ID, 0, entity);
},

unregister: function(entity) {
    var ID = entity.getID();
    var index = this._entities.indexOf(entity);
    if (index != -1)
        this._entities.splice(index,1);


},

findEntityInRange: function(posX, posY, width, height) {

    for (var ID in this._entities){
        var e = this._entities[ID];
        var distanceBetween = util.distSq(posX, posY, 
            e.posX, e.posY, g_canvas.width, g_canvas.height);
        e.color = "blue";
        if (posX < 300-width/2){
            if (posY < 300 - height/2){
                if (e.posX < 300 && e.posY < 300){
                    e.color = "red";
                }
            }else{
                if (e.posX < 300 && e.posY > 300){
                    e.color = "red";
                }
            }
        }else{
            if (posY < 300 - height/2){
                if (e.posX > 300 && e.posY < 300){
                    e.color = "red";
                }
            }else{
                if (e.posX > 300 && e.posY > 300){
                    e.color = "red";
                }
            }
        }

    }
    return null;

},

render: function(ctx) {

    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        //console.log()
        var e = this._entities[ID];
        //util.strokeCircle(ctx, e.posX/2, e.posY*2, e.height/2);
    }
    ctx.strokeStyle = oldStyle;
}

}
