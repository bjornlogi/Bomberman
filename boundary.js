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
};

Boundary.prototype.render = function (ctx) {

    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillStyle = "grey";
    ctx.strokeStyle="black";
    ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    ctx.strokeRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    ctx.lineWidth = 0;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";    
};