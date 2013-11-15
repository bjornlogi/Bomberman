


function PowerUp(descr) {

    for (var property in descr) {
        this[property] = descr[property];
    }
    // Common inherited setup logic from Entity
    this.setup(descr);
    spatialManager.register(this);

}

PowerUp.prototype = new Entity();

PowerUp.prototype.halfHeight = 20;
PowerUp.prototype.halfWidth = 20;

PowerUp.prototype.update = function (du) {

	if (this._isDeadNow)
		return entityManager.KILL_ME_NOW;
}

PowerUp.prototype.render = function (ctx){

	//console.log(this.powerUp);
	//ctx.fillStyle = this.color;
	// if (this.powerUp == "Range")
 //  		ctx.fillStyle = "blue";
 //  	else ctx.fillStyle = "red";
 //  	ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
  	
  if (g_useDebug){
	   ctx.fillStyle = this.color;
  	 ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
  	 ctx.fillStyle = "white";
  }
  else
     g_sprites[4].drawAt(this.cx-20, this.cy-20);
}

PowerUp.prototype.bePickedUp = function (){
	this.kill();
	return this.powerUp;
}
