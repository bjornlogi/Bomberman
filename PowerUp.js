


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
  this.fadeEffect(du);
  if (!this.switchDir)
    this.fade -= du;
  else this.fade += du;

	if (this._isDeadNow)
		return entityManager.KILL_ME_NOW;
}

PowerUp.prototype.fade = 1500/NOMINAL_UPDATE_INTERVAL;
PowerUp.prototype.switchDir = false;

PowerUp.prototype.render = function (ctx){

  
  ctx.globalAlpha = this.fade/PowerUp.prototype.fade;

  if (g_useDebug){
	   ctx.fillStyle = this.color;
  	 ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
  	 ctx.fillStyle = "white";
  }
  else
     sprites.powerUp[0].drawAt(this.cx-20, this.cy-20);
   ctx.globalAlpha = 1;
}

PowerUp.prototype.fadeEffect = function (du){
  
  if (this.fade < du*2 || this.fade >= PowerUp.prototype.fade)
     this.switchDir = !this.switchDir;
}

PowerUp.prototype.bePickedUp = function (){
	this.kill();
	return this.powerUp;
}
