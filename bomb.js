// ======
// Bomb
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/



// A generic contructor which accepts an arbitrary descriptor object
function Bomb(descr) {

    for (var property in descr) {
        this[property] = descr[property];
    }
    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    //this.fireSound.play();
}

Bomb.prototype = new Entity();
Bomb.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;
Bomb.prototype.halfWidth = 15;
Bomb.prototype.halfHeight = 15;

Bomb.prototype.explode = {
        stats : false
}

Bomb.prototype.update = function (du) {

  //spatialManager.unregister(this);
    if(this._isDeadNow)
        {
            return entityManager.KILL_ME_NOW; 
        }

    this.lifeSpan -= du;
    if (this.lifeSpan < 0){
        entityManager.explode(this.cx, this.cy, this.bombReach, 12, 12);
        this.explode.stats = true;
        return entityManager.KILL_ME_NOW;
        
    }
    //spatialManager.register(this);

}; 

Bomb.prototype.render = function (ctx) {
    var fadeThresh = Bomb.prototype.lifeSpan / 3;

    var col = "#FFEE00";
    var line = 2;
    var size = 30;
    var newX = this.cx-27.5;
    var newY = this.cy-30;

    if(this.lifeSpan < fadeThresh) {
        //ctx.globalAlpha = this.lifeSpan / fadeThresh;
        col ="#FF2F00";
        line = 7;
        size = 26.5;
    }

    else if(this.lifeSpan/2 < fadeThresh) {
        //ctx.globalAlpha = this.lifeSpan / fadeThresh;
        col ="#FF6A00";
        line = 5;
        size = 27.5;
    }

    else if(this.lifeSpan/3 < fadeThresh) {
        //ctx.globalAlpha = this.lifeSpan / fadeThresh;
        col ="#FFAE00";
        line = 3;
        size = 28.5;
    }

    ctx.fillStyle=col;
    ctx.strokeStyle="black";
    ctx.lineWidth = line;
    ctx.fillRect(this.cx-this.halfWidth, this.cy-this.halfHeight, this.halfWidth*2,this.halfHeight*2);
    //ctx.strokeRect(newX, newY,size,size);
    ctx.fill();
    //ctx.stroke();

    ctx.globalAlpha = 1;
};
