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

 cornerBundle : function (cx,cy,halfWidth,halfHeight){
    return {topLeft :  getBottomRightCorner(cx,cy,halfWidth,halfHeight),
            bottomRight: getTopLeftCorner(cx,cy,halfWidth,halfHeight)};
 },

 pointsBundle : function (c, entity){
    return {
        pbrNext : this.getBottomRightCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight),
        pbr : this.getBottomRightCorner(c.cx, c.cy, c.halfWidth, c.halfHeight),
        ptlNext : this.getTopLeftCorner(c.nextX, c.nextY, c.halfWidth, c.halfHeight),
        ptl : this.getTopLeftCorner(c.cx, c.cy, c.halfWidth, c.halfHeight),
        hbr : this.getBottomRightCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight),
        htl : this.getTopLeftCorner(entity.cx, entity.cy, entity.halfWidth, entity.halfHeight)
    };
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
            points.pbr.x > points.htl.x && points.pbr.x < points.hbr.x){
                return true;
        }
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
 //Because it is frustrating when the player needs to adjust position to fit
 // through gaps
 shiftIfAlmostThrough : function(e, player) {
    var eTop = this.getTopLeftCorner(e.cx,e.cy,e.halfWidth,e.halfHeight);
    var eBottom = this.getBottomRightCorner(e.cx,e.cy,e.halfWidth,e.halfHeight);
    var playerBottom = this.getBottomRightCorner(player.cx,player.cy,player.halfWidth,player.halfHeight);
    var playerTop = this.getTopLeftCorner(player.cx,player.cy,player.halfWidth,player.halfHeight);
    
    if (playerTop.y > e.cy && playerTop.y < eBottom.y)
         return ({x:0,y:1});
    else if (playerBottom.y < e.cy && playerBottom.y > eTop.y)
        return ({x:0,y:-1});
    else if (playerBottom.x > eTop.x && playerBottom.x < e.cx)
        return ({x:-1,y:0});
    else if (playerTop.x < eBottom.x && playerTop.x > e.cx)
        return ({x:1,y:0});
    else
        return ({x:0, y:0});
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

/*
    TYPE CHECKS
*/

isBoundary : function(e){
    return (e.cx == 20 || e.cx==580 || e.cy == 20 || e.cy == 580)
},

isBrick : function (e){
     return e instanceof Brick;
},

isPowerUp : function (e){
    return e instanceof PowerUp;
},

isBarrel : function (e){
    return e instanceof Barrel;
},

isPlayer : function (e){
    return e instanceof Player;
},

containsPowerUp : function (re) {
    for (var e in re){
        if (this.isPowerUp(re[e]))
            return true;
    }
    return false;
},

/*
    Collision checks for Robot to determine optimal direction
*/

canMoveToTheRight : function (rob){
    rob.nextX = rob.cx + rob.velX*2;
    rob.nextY = rob.cy;
    var x = rob.cx
    var hitEntities = rob.findHitEntity();
    if (hitEntities.length != 0){
        for (var h in hitEntities){
            var points = this.pointsBundle(rob,hitEntities[h]);
            if (this.checkLeftSide(points)){
                rob.cx = x;
                return false;
            }
        }
    }
    rob.cx = x;
    return true;
},

canMoveToTheLeft : function (rob){
    rob.nextX = rob.cx - rob.velX*2;
    rob.nextY = rob.cy;
    var x = rob.cx
    var hitEntities = rob.findHitEntity();
    if (hitEntities.length != 0){
        for (var h in hitEntities){
            var points = this.pointsBundle(rob,hitEntities[h]);
            if ( this.checkRightSide(points) ){
                rob.cx = x;
                return false;
            }
        }
    }
    rob.cx = x;
    return true;
},

canMoveForwards : function (rob){
    var y = rob.cy;
    rob.nextY = rob.cy - rob.velY*10;
    var hitEntities = rob.findHitEntity();
    if (hitEntities.length != 0){
        for (var h in hitEntities){
            var points = this.pointsBundle(rob,hitEntities[h]);
            if (this.checkTop(points) ){
                rob.cy = y;
                return false;
            }
        }
    }
    rob.cy = y;
    return true;
},

canMoveBackwards : function (rob){
    var y = rob.cy;
    rob.nextY = rob.cy + rob.velY*10;
    var hitEntities = rob.findHitEntity();
    if (hitEntities.length != 0){
        for (var h in hitEntities){
            var points = this.pointsBundle(rob,hitEntities[h]);
            if (this.checkBottom(points) ){
                rob.nextY = y;
                return false;
            }
        }
    }
    rob.nextY = y;
    return true;
},

// // MISC
// // ====

square: function(x) {
    return x*x;
},


// // DISTANCES
// // =========

findNearestSpotForBomb : function(cx,cy){
    var x = ((cx - 55) / 40).toFixed(0);
    if (x < 0) x = 0;
    var y = ((cy - 55) / 40).toFixed(0);
    if (y < 0) y = 0;
    return {t:x, s:y};
},

// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
        var base_image = new Image();
        base_image.src = 'https://notendur.hi.is/~pap5/bomberman/sprite/a_grass_background_1.jpg';
        base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
    }
    var base_image = new Image();
    base_image.src = 'https://notendur.hi.is/~pap5/bomberman/sprite/starscape.png';
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
