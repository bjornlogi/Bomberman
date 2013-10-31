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
var xPos = this.halfWidth;
var yPos = this.halfHeight;
    // (cx, cy) is the centre; must offset it for drawing
    for(var i = 0; i < 10; i++)
    {
      for(var j = 0; j < 10; j++)
      {
       ctx.fillRect(this.cx - xPos, this.cy - yPos,this.halfWidth * 2,this.halfHeight * 2);
    	    
       yPos += 30;
      }
    yPos = this.halfHeight;
    xPos += 30;
  }
};



