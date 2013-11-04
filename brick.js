

/*function brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}*/

function brick(descr) {

    // Common inherited setup logic from Entity

    this.cx = 15;
    this.cy = 15;

};

brick.prototype.halfWidth = 15;
brick.prototype.halfHeight = 15;

brick.prototype.update = function (du) {
};

brick.prototype.render = function (ctx) {

    // (cx, cy) is the centre; must offset it for drawing
   
       ctx.fillStyle = "blue";
       ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth * 2,this.halfHeight * 2);
    	 ctx.fillStyle = "white";
       
};


/*var gWall = new wall({
  cx : 533,
  cy : 533
});*/
