function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
};	

Player.prototype.render = function (ctx) {
    //batSprite.drawCentredAt(ctx, this.cx,this.cy,this.rotation, this.stretch);
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2)
};

Player.prototype.KEY_UP = 'W'.charCodeAt(0);
Player.prototype.KEY_DOWN = 'S'.charCodeAt(0);
Player.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT = 'D'.charCodeAt(0);

Player.prototype.update = function (du) {
    //batSprite.drawCentredAt(ctx, this.cx,this.cy,this.rotation, this.stretch);
   	if (eatKey(this.KEY_UP)) {
        this.cy -= 30;
    }
    if (eatKey(this.KEY_DOWN)) {
        this.cy += 30;
    }
    if (eatKey(this.KEY_LEFT)) {
        this.cx -= 30;
    }
    if (eatKey(this.KEY_RIGHT)) {
        this.cx += 30;
    }
};

//Construct the player
var player = new Player({
    cx : 45,
    cy : 45,
    halfWidth: 15,
    halfHeight: 15
});