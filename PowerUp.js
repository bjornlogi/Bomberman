


function PowerUp(descr) {

    for (var property in descr) {
        this[property] = descr[property];
    }
    // Common inherited setup logic from Entity
    this.setup(descr);

}

PowerUp.prototype = new Entity();

PowerUp.prototype.halfHeight = 20;
PowerUp.prototype.halfWidth = 20;

PowerUp.prototype.update = function (du) {

	if (this._isDeadNow)
		return entityManager.KILL_ME_NOW;
}

PowerUp.prototype.render = function (ctx){
  if (g_useDebug){
	   ctx.fillStyle = this.color;
  	 ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
  	 ctx.fillStyle = "white";
  }
  else
     g_sprites[24].drawAt(this.cx-20, this.cy-20);
}

