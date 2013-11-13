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

findEntityInRange: function(cx, cy, halfWidth, halfHeight,nextX, nextY) {
    var entities = [];
    for (var ID in this._entities){
        var e = this._entities[ID];

        if (e instanceof Boundary)
            e.color="gray";
        else
            e.color = "blue";

        var inRange = this.isInRange(e,cx,cy, halfWidth,halfHeight); 
        if (inRange){
            e.color = "red";
            if (this.isColliding(e,cx,cy,halfWidth,halfHeight,nextX,nextY))
                entities.push(e);

        }           
    }
    return entities;
},

isColliding : function (h,cx,cy,halfWidth,halfHeight,nextX, nextY){
    var pbrNext = {x: nextX + halfWidth, y: nextY + halfHeight}; //bottomright corner of player
    var pbr = {x: cx + halfWidth, y: cy + halfHeight};

     //top right corner
    var ptlNext = {x: nextX - halfWidth, y: nextY - halfHeight};
    var ptl = {x: cx - halfWidth, y: cy - halfHeight};
    
    //bottom right and top left corner of hit entity
    var hbr = {x: h.cx + h.halfWidth, y: h.cy + h.halfHeight};
    var htl = {x: h.cx - h.halfWidth, y: h.cy - h.halfHeight};
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

isInRange : function(e, cx, cy, width, height){
    if (e instanceof Boundary){
        if(e.cx == 300){
            if (e.cy == 20 && cy < 80)
                return true;
            else if (e.cy == 580 && cy > 540)
                return true;
        }
        else if (e.cy == 300){
            if (e.cx == 20 && cx < 70)
                return true;
            else if (e.cx == 580 && cx > 510){
                return true;
            }
        }
    }

    if (cx < 300){
            if (cy < 300){
                if (e.cx < 300 && e.cy < 300){
                    return true;
                }
            }else{
                if (e.cx < 300 && e.cy > 300){
                    return true;
                }
            }
        }else{
            if (cy < 300){
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
