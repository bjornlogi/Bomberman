function Boundary(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    spatialManager.register(this);
}


Boundary.prototype = new Entity();
Boundary.prototype.halfWidth = 20;
Boundary.prototype.halfHeight = 20;

Boundary.prototype.update = function (du) {
    if (entityManager.resetEM){
        spatialManager.unregister(this);
        return entityManager.KILL_ME_NOW;
    }
};

Boundary.prototype.render = function (ctx) {

    // (cx, cy) is the centre; must offset it for drawing
    if (g_useDebug){
    ctx.fillStyle = this.color;
    ctx.strokeStyle="black";
    ctx.lineWidth = 2;
    ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    ctx.strokeRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";    
}
else
    sprites.boundary[0].drawAt(this.cx-this.halfWidth, this.cy-this.halfHeight);

};