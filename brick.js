

function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.sprite = this.sprite || sprites.brick;
    this.setup(descr);
    spatialManager.register(this);
}

Brick.prototype = new Entity();

Brick.prototype.halfWidth = 20;
Brick.prototype.halfHeight = 20;
Brick.prototype.color = "blue";

Brick.prototype.update = function (du) {
    if (entityManager.resetEM){
        spatialManager.unregister(this);
        return entityManager.KILL_ME_NOW;
    }
};

Brick.prototype.render = function (ctx) {

    // (cx, cy) is the centre; must offset it for drawing
  if (g_useDebug){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    ctx.fillStyle = "white";
}
  else
    sprites.brick[0].drawAt(this.cx-this.halfWidth, this.cy-this.halfHeight);     
};
