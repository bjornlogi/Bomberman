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
}

Explosion.prototype = new Entity();

Explosion.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;


Explosion.prototype.update = function (du){
	//spatialManager.unregister(this);
	
	var rangeEntities = this.findHitEntity();
	for (var rE in rangeEntities){
		var r = rangeEntities[rE];
		
		if (r instanceof Boundary || r instanceof Brick)
				return entityManager.KILL_ME_NOW;
		else if (r instanceof Barrel){
			r.takeExplosion();
			return entityManager.KILL_ME_CHILDREN;
		}
		else if (r instanceof Player)
				r.takeExplosion();
	}
	this.lifeSpan -= du;
	if (this.lifeSpan < 0){
		return entityManager.KILL_ME_NOW;
	}
	//console.log(this.isColliding());
	//spatialManager.register(this);
}

Explosion.prototype.render = function (ctx){


	ctx.fillStyle="orange";
	ctx.fillRect(this.nextX-this.halfWidth, this.nextY-this.halfHeight, this.halfWidth*2,this.halfHeight*2);
    ctx.fill();

    var pbr = {x: this.nextX + this.halfWidth, y: this.nextY + this.halfHeight};
    var ptl = {x: this.nextX - this.halfWidth, y: this.nextY - this.halfHeight};
    ctx.fillStyle="yellow";
    // //console.log(pbr);
    //ctx.fillRect(pbr.x, pbr.y,4,4);
     //ctx.fillRect(this.nextX, this.nextY,4,4);
    // ctx.fillStyle="white";
     //ctx.fillRect(ptl.x, ptl.y,4,4);
}

