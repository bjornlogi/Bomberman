function wall(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}



wall.prototype.halfWidth = 15;
wall.prototype.halfHeight = 15;

wall.prototype.update = function (du) {
};

wall.prototype.render = function (ctx) {

    // (cx, cy) is the centre; must offset it for drawing
       ctx.fillStyle = "grey";
       ctx.strokeStyle="black";
       ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
        ctx.strokeRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
       ctx.lineWidth = 2;
       ctx.fill();
       ctx.stroke();
    	 ctx.fillStyle = "white";


       
};