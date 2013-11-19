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

    this._entities.splice(ID, 0, entity);
},

unregister: function(entity) {
    var ID = entity.getID();
    var index = this._entities.indexOf(entity);
    if (index != -1)
        this._entities.splice(index,1);
},

findEntityInRange: function(checker) {
    var entities = [];
    for (var ID in this._entities){
        var entity = this._entities[ID];

        if (entity instanceof Boundary)
            entity.color="gray";
        else
            entity.color = "blue";

        var inRange = this.isInRange(entity,checker); 
        if (inRange){
            entity.color = "red";
            if (this.isColliding(entity,checker))
                entities.push(entity);

        }           
    }
    return entities;
},

isColliding : function (entity,c){

    var points = {
        pbrNext : util.getBottomRightCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight),
        pbr : util.getBottomRightCorner(c.cx, c.cy, c.halfWidth, c.halfHeight),
        ptlNext : util.getTopLeftCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight),
        ptl : util.getTopLeftCorner(c.cx, c.cy, c.halfWidth, c.halfHeight),
        hbr : util.getBottomRightCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight),
        htl : util.getTopLeftCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight)
    };


    if (util.checkCollisionFromSides(points))
        return true;

    if (util.checkCollisionFromTopAndBottom(points))
        return true;
        
    if (util.checkCollisionFromWithin(points))
        return true; 

    return false;
},

isInRange : function(e, c){
    
    /*
    *       QUADRANT SCHEME
    *        ___________
    *       |  1  |  2  |
    *       |_____|_____|    
    *       |  3  |  4  |
    *       |_____|_____|
    */
    if (c.isExplosion)
         return true;
    if (util.areBothInSameQuad(e,c))
        return true;
    if(util.areMiddleBlocksInRange(e,c))
        return true;

    
        
    return false;
},

render: function(ctx) {


    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    console.log(this);
    for (var ID in this._entities) {
        var e = this._entities[ID];
            
        //util.strokeCircle(ctx, e.cx/2, e.cy*2, e.height/2);
    }
    ctx.strokeStyle = oldStyle;
}

}
