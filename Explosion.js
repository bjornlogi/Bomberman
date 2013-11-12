"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/



// A generic contructor which accepts an arbitrary descriptor object
function Explosion(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // for (var property in descr) {
    //     this[property] = descr[property];
    // }

    // Make a noise when I am created (i.e. fired)
    //this.fireSound.play();
}

Explosion.prototype = new Entity();

Explosion.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;



Explosion.prototype.update = function (du){
	spatialManager.unregister(this);
	this.lifeSpan -= du;
	if (this.lifeSpan < 0){
		return entityManager.KILL_ME_NOW;
	}
	spatialManager.unregister(this);
}

Explosion.prototype.render = function (ctx){
	ctx.fillStyle="orange";
	ctx.fillRect(this.cx-27.5, this.cy-30, 20,20);
    ctx.fill();
}

