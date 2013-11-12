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

findEntityInRange: function(cx, cy, width, height) {
    var entities = [];
    for (var ID in this._entities){
        var e = this._entities[ID];
        if (e instanceof Boundary)
            e.color="gray";
        else
            e.color = "blue";
        var distanceBetween = util.distSq(cx, cy, 
            e.cx, e.cy, g_canvas.width, g_canvas.height);
        var inRange = this.isInRange(e,cx,cy, width,height); 
        if (inRange){
            e.color = "red";
            entities.push(e);
        }
            
    }
    return entities;

},

isColliding : function (e,cx,cy,width,height){

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

    if (cx < 300-width){
            if (cy < 300 + height/2){
                if (e.cx < 300 && e.cy < 300){
                    return true;
                }
            }else{
                if (e.cx < 300 && e.cy > 300){
                    return true;
                }
            }
        }else{
            if (cy < 300 - height/2){
                if (e.cx > 300 && e.cy < 300){
                    return true;
                }
            }else{
                if (e.cx > 300 && e.cy > 300){
                    return true;
                }
            }
        }

    return false;
},

render: function(ctx) {

    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        //console.log()
        var e = this._entities[ID];
        if (e instanceof Boundary)
            console.log(e);
        //util.strokeCircle(ctx, e.cx/2, e.cy*2, e.height/2);
    }
    ctx.strokeStyle = oldStyle;
}

}
