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

Barrel.prototype.halfWidth = 15;
Barrel.prototype.halfHeight = 15;

Barrel.prototype.findNearest = function(){
    var x = ((this.cx - 72) / 40).toFixed(0);
    if (x < 0) x = 0;
    var y = ((this.cy - 75) / 40).toFixed(0);
    if (y < 0) y = 0;
    return {t:x, s:y};
}

Barrel.prototype.update = function (du) {

  spatialManager.unregister(this);
    if(this._isDeadNow)
        {
            return entityManager.KILL_ME_NOW; 
        }
    this.wrapPosition();
    spatialManager.register(this);
};

Barrel.prototype.render = function (ctx) {
	var nearest = this.findNearest();
	ctx.fillStyle="white";
	ctx.fillRect(85+40*nearest.t, 85+40*nearest.s, this.halfHeight*2, this.halfWidth*2);
	ctx.fill();

	ctx.globalAlpha = 1;
};
