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
Bomb.prototype.switchSprite = 1;
Bomb.prototype.currentSprite = 0;
Bomb.prototype.halfWidth = 15;
Bomb.prototype.halfHeight = 15;

Bomb.prototype.explode = {
        stats : false
}

Bomb.prototype.update = function (du) {

    if (entityManager.resetEM) return entityManager.KILL_ME_NOW;
    this.lifeSpan -= du;
    if (this.lifeSpan < 0){
        this.player.incrementBombs();
       // entityManager._players[this.player].incrementBombs();

        //++entityManager._players[this.player].bombs;
        entityManager.explode(this.cx, this.cy, this.bombReach, 16, 16);
        this.explode.stats = true;
        return entityManager.KILL_ME_NOW;
        
    }

}; 

Bomb.prototype.render = function (ctx) {
    var fadeThresh = Bomb.prototype.lifeSpan / 25;

    var col = "#FFEE00";

    var bomb_sprites = sprites.bomb;
    
    if (Bomb.prototype.lifeSpan-this.lifeSpan > fadeThresh*this.switchSprite){
        this.switchSprite++;
        ++this.currentSprite;
    }
    var sprite = bomb_sprites[this.currentSprite % 4];


     if (g_useDebug){
        ctx.fillStyle=col;
        ctx.strokeStyle="black";
        ctx.fillRect(this.cx-this.halfWidth, this.cy-this.halfHeight, this.halfWidth*2,this.halfHeight*2);
        //ctx.strokeRect(newX, newY,size,size);
        ctx.fill();
        //ctx.stroke();
    }
    else{
        sprite.drawAt(this.cx-20, this.cy-20);
    }

    ctx.globalAlpha = 1;
};
