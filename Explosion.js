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

    for (var property in descr) {
        this[property] = descr[property];
    }
    this.explodeSound.play();

}

Explosion.prototype = new Entity();

Explosion.prototype.halfWidth = 16;
Explosion.prototype.halfHeight = 16;

Explosion.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Explosion.prototype.explodeSound = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/Explosion12.wav");

Explosion.prototype.update = function (du){
	//spatialManager.unregister(this);
	if (entityManager.resetEM){
        spatialManager.unregister(this);
        return entityManager.KILL_ME_NOW;
    }

	var rangeEntities = this.findHitEntity(true);
	for (var rE in rangeEntities){
		var r = rangeEntities[rE];
		
		if (util.isBoundary(r) || util.isBrick(r))
				return entityManager.KILL_ME_NOW;
		else if (util.isBarrel(r)){
			r.takeExplosion();
			return entityManager.KILL_ME_CHILDREN;
		}
		else if (util.isPlayer(r))
				r.takeExplosion();
	}
	this.lifeSpan -= du;
	if (this.lifeSpan < 0){
		return entityManager.KILL_ME_NOW;
	}
}

Explosion.prototype.render = function (ctx){

	if(g_useDebug){
		ctx.fillStyle="orange";
		ctx.fillRect(this.nextX-this.halfWidth, this.nextY-this.halfHeight, this.halfWidth*2,this.halfHeight*2);
	    ctx.fill();

	    var pbr = {x: this.nextX + this.halfWidth, y: this.nextY + this.halfHeight};
	    var ptl = {x: this.nextX - this.halfWidth, y: this.nextY - this.halfHeight};
	    ctx.fillStyle="yellow";
	 }
	 else
	 	 sprites.explosion[0].drawAt(this.nextX-this.halfWidth, this.nextY-this.halfHeight);

}

