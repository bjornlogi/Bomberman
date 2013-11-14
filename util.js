// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


 getBottomRightCorner: function(cx,cy,halfWidth,halfHeight) {
     return {x: cx + halfWidth, y: cy + halfHeight}; 
 },

  getTopLeftCorner: function(cx,cy,halfWidth,halfHeight) {
     return {x: cx - halfWidth, y: cy - halfHeight}; 
 },

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

// isBetween: function(value, lowBound, highBound) {
//     if (value < lowBound) { return false; }
//     if (value > highBound) { return false; }
//     return true;
// },


// // RANDOMNESS
// // ==========

// randRange: function(min, max) {
//     return (min + Math.random() * (max - min));
// },


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
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
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
