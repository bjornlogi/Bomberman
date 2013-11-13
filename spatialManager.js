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
    //var pbrNext = {x: c.nextX + c.halfWidth, y: c.nextY + c.halfHeight}; 
   // var pbr = {x: c.cx + c.halfWidth, y: c.cy + c.halfHeight};
    var pbrNext = util.getBottomRightCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight);
    var pbr = util.getBottomRightCorner(c.cx, c.cy, c.halfWidth, c.halfHeight);

    //var ptlNext = {x: c.nextX - c.halfWidth, y: c.nextY - c.halfHeight};
    //var ptl = {x: c.cx - c.halfWidth, y: c.cy - c.halfHeight};
    var ptlNext = util.getTopLeftCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight); 
    var ptl = util.getTopLeftCorner(c.cx, c.cy, c.halfWidth, c.halfHeight);
    
    //bottom right and top left corner of hit entity
    var hbr = {x: entity.cx + entity.halfWidth, y: entity.cy + entity.halfHeight};
    var htl = {x: entity.cx - entity.halfWidth, y: entity.cy - entity.halfHeight};
    //var htl = util.getTopLeftCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight);
    //var hbr = util.getBottomRightCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight);
    //check right side of box 
    if ((ptlNext.x < hbr.x) && (ptl.x > hbr.x)){
         if ((ptl.y > htl.y && ptl.y < hbr.y) || 
             (pbr.y > htl.y && pbr.y < hbr.y)){
            return true;
         }
     }
     //check left side of box
    else if (pbrNext.x > htl.x && pbr.x < htl.x){
        if ((pbr.y < hbr.y && pbr.y > htl.y) || 
            (ptl.y > htl.y && ptl.y < hbr.y))
            return true;
    }
    else if ((ptlNext.y < hbr.y) && (ptl.y > hbr.y) || (pbrNext.y > htl.y) && (pbr.y < htl.y)){
        if (ptl.x > htl.x && ptl.x < hbr.x || pbr.x > htl.x && pbr.x < hbr.x)
            return true;
    }
    //if (Next.x == ptl.x && ptlNext.y == ptl.y){
        if (htl.x > ptlNext.x && htl.x < pbrNext.x ||
            hbr.x > ptlNext.x && hbr.x < pbrNext.x){
            if ((htl.y> ptlNext.y && htl.y < pbrNext.y) ||
                (hbr.y > ptlNext.y && hbr.y < pbrNext.y))
                return true;
        }
   // }
    return false;
},

isInRange : function(e, c){
    if (e instanceof Boundary){
        if(e.cx == 300){
            if (e.cy == 20 && c.cy < 80)
                return true;
            else if (e.cy == 580 && c.cy > 540)
                return true;
        }
        else if (e.cy == 300){
            if (e.cx == 20 && c.cx < 70)
                return true;
            else if (e.cx == 580 && c.cx > 510){
                return true;
            }
        }
    }

    if (c.cx < 300){
            if (c.cy < 300){
                if (e.cx < 300 && e.cy < 300){
                    return true;
                }
            }else{
                if (e.cx < 300 && e.cy > 300){
                    return true;
                }
            }
        }else{
            if (c.cy < 300){
                if (e.cx > 300 && e.cy < 300){
                    return true;
                }
            }else{
                if (e.cx > 300 && e.cy > 300){
                    return true;
                }
            }
        }
    if (e instanceof Player){
        return true;
    }
        

    return false;
},

render: function(ctx) {


    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    console.log(entityManager);
    for (var ID in this._entities) {
        //console.log()
        var e = this._entities[ID];
            
        //util.strokeCircle(ctx, e.cx/2, e.cy*2, e.height/2);
    }
    ctx.strokeStyle = oldStyle;
}

}
