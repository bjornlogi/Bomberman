// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

/*
    Get corners of squares sent to Collision Detection
*/
 getBottomRightCorner: function(cx,cy,halfWidth,halfHeight) {
     return {x: cx + halfWidth, y: cy + halfHeight}; 
 },

  getTopLeftCorner: function(cx,cy,halfWidth,halfHeight) {
     return {x: cx - halfWidth, y: cy - halfHeight}; 
 },

 /*
 *   Collision Detection
 */

 checkCollisionFromSides: function(points){
    return this.checkRightSide(points) || this.checkLeftSide(points);
 },

 checkCollisionFromTopAndBottom: function(points){
    return this.checkTop(points) || this.checkBottom(points);
 },

 checkCollisionFromWithin: function(points){
    if (points.htl.x > points.ptlNext.x && points.htl.x < points.pbrNext.x ||
            points.hbr.x > points.ptlNext.x && points.hbr.x < points.pbrNext.x){
            if ((points.htl.y> points.ptlNext.y && points.htl.y < points.pbrNext.y) ||
                (points.hbr.y > points.ptlNext.y && points.hbr.y < points.pbrNext.y))
                return true;
        }
 },

  checkRightSide : function(points){
    if ((points.ptlNext.x < points.hbr.x) && (points.ptl.x > points.hbr.x)){
         if ((points.ptl.y > points.htl.y && points.ptl.y < points.hbr.y) || 
             (points.pbr.y > points.htl.y && points.pbr.y < points.hbr.y)){
            return true;
         }
     }
     return false;
 },

 checkLeftSide : function (points){
    if (points.pbrNext.x > points.htl.x && points.pbr.x < points.htl.x){
        if ((points.pbr.y < points.hbr.y && points.pbr.y > points.htl.y) || 
            (points.ptl.y > points.htl.y && points.ptl.y < points.hbr.y))
            return true;
    }
    return false;
 },

 checkTop : function (points){
    if ((points.ptlNext.y  < points.hbr.y) && (points.ptl.y > points.hbr.y)){
        if (points.ptl.x > points.htl.x && points.ptl.x < points.hbr.x || 
            points.pbr.x > points.htl.x && points.pbr.x < points.hbr.x)
                return true;
    }
    return false;
 },

 checkBottom : function (points){
    if ((points.pbrNext.y > points.htl.y) && (points.pbr.y < points.htl.y)){
        if (points.ptl.x > points.htl.x && points.ptl.x < points.hbr.x || 
            points.pbr.x > points.htl.x && points.pbr.x < points.hbr.x)
            return true;
    }
    return false;
 },

/*
 *  Range Check
 */

areMiddleBlocksInRange : function (e, c){
    return this.topOrBottomBlockIsInRange(e,c) || this.sideBlockIsInRange(e,c);
},

topOrBottomBlockIsInRange : function (e,c){
    if(e.cx == 300){
            if (e.cy == 20 && c.cy < 80)
                return true;
            else if (e.cy == 580 && c.cy > 540)
                return true;
        }

},

sideBlockIsInRange : function (e,c){
    if (e.cy == 300){
        if (e.cx == 20 && c.cx < 70)
                return true;
        else if (e.cx == 580 && c.cx > 510){
                return true;
        }
    }
},

areBothInSameQuad : function (e,c){
    return (util.areBothInFirstQuad(e,c) ||
            util.areBothInSecondQuad(e,c)||
            util.areBothInThirdQuad(e,c) ||
            util.areBothInFourthQuad(e,c));
},

areBothInFirstQuad : function (e,c){
    if (c.cx < 350 && c.cy < 350 &&
        e.cx < 350 && e.cy < 350)
            return true;

},

areBothInSecondQuad : function (e,c){
    if (c.cx > 300 && c.cy < 350 &&
        e.cx > 300 && e.cy < 350)
            return true;
},

areBothInThirdQuad : function (e,c){
    if (c.cx < 350 && c.cy > 300 &&
        e.cx < 350 && e.cy > 300)
        return true;
},

areBothInFourthQuad : function (e,c){
    if (c.cx > 300 && c.cy > 300 &&
        e.cx > 300 && e.cy > 300)
        return true;
},

isBoundary : function(b){
    return (b.cx == 20 || b.cx==580 || b.cy == 20 || b.cy == 580)
},

isBrick : function (b){
     for (var i = 0; i<36; i++){
         if(b.cx == 100+(80*(i/6).toFixed(0)) && b.cy == 100+(80*(i%6)))
            return true;
    }
},

maybeShift : function (entity,player,du){
    

    
    
},


// // MISC
// // ====

square: function(x) {
    return x*x;
},


// // DISTANCES
// // =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    //var prevfillStyle = ctx.fillStyle;
    //ctx.fillStyle = "green";
    //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.fillStyle = prevfillStyle;
    var base_image = new Image();
    base_image.src = 'https://notendur.hi.is/~pap5/bomberman/sprite/a_grass_background_1.jpg';
    base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0);
  }
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

};
