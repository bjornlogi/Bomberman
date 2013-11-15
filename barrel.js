// ======
// Barrel
// ======

"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Barrel(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    	}

    spatialManager.register(this);
}

Barrel.prototype = new Entity();

Barrel.prototype.halfWidth = 20;
Barrel.prototype.halfHeight = 20;

/* Barrel.prototype.findNearest = function(){
    var x = ((this.cx - 72) / 40).toFixed(0);
    if (x < 0) x = 0;
    var y = ((this.cy - 75) / 40).toFixed(0);
    if (y < 0) y = 0;
    return {t:x, s:y};
}
*/
Barrel.prototype.update = function (du) {

  spatialManager.unregister(this);
    if(this._isDeadNow)
        {
            return entityManager.KILL_ME_NOW; 
        }
    //this.wrapPosition();
    spatialManager.register(this);
};

Barrel.prototype.takeExplosion = function(){
    this.kill();
    this.maybeDropAPowerUp();
};

Barrel.prototype.render = function (ctx) {
	//var nearest = this.findNearest();
    
    if (g_useDebug){
	ctx.fillStyle="white";
	ctx.fillRect(this.cx-this.halfWidth, this.cy-this.halfHeight, this.halfHeight*2, this.halfWidth*2);
	ctx.fill();
}
else
    g_sprites[21].drawAt(this.cx-this.halfWidth, this.cy-this.halfHeight);

	ctx.globalAlpha = 1;
};

Barrel.prototype.maybeDropAPowerUp = function(){
    var powerUp = (Math.random()*10).toFixed(0);
    if (powerUp%4 == 0)
        entityManager.generatePowerUp(this.cx, this.cy, powerUp%3);
}













