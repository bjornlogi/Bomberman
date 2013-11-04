function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     this.sprite = this.sprite || g_sprites.players;
};	

var g_cel = 0;
Player.prototype.orientation = {
    down : 1,
    left : 4,
    right : 7,
    up : 10
}

Player.prototype.render = function (ctx) {
    var cel = g_sprites[this.playerOrientation];
    cel.drawAt(this.cx,this.cy);

};

Player.prototype.switchStepReset=250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;

Player.prototype.update = function (du) {
    this.switchStep -= du;
   	if (keys[this.KEY_UP]) {
        this.cy -= 1.5;
        this.updateSteps("up");
        this.playerOrientation = this.orientation.up;
    }
    if (keys[this.KEY_DOWN]) {
        this.cy += 1.5;
        this.updateSteps("down");
        this.playerOrientation = this.orientation.down;
    }
    if (keys[this.KEY_LEFT]) {
        this.cx -= 1.5;
        this.updateSteps("left");
        this.playerOrientation = this.orientation.left;
    }
    if (keys[this.KEY_RIGHT]) {
        this.cx += 1.5;
        this.updateSteps("right");
        this.playerOrientation = this.orientation.right;
    }
};



Player.prototype.updateSteps = function(keyPressed){
    
    if(this.switchStep < 0){
        if (keyPressed == "down"){
            if (this.orientation.down == 2)
                this.orientation.down = 0; 
            else if (this.orientation.down == 0 || this.orientation.down == 1)
                this.orientation.down = 2;
        }

        else if (keyPressed == "up"){
            if (this.orientation.up == 11)
                this.orientation.up = 9; 
            else if (this.orientation.up == 9 || this.orientation.up == 10)
                this.orientation.up = 11;
        }

        else if (keyPressed == "left"){
            if (this.orientation.left == 5)
                this.orientation.left = 3; 
            else if (this.orientation.left == 3 || this.orientation.left == 4)
                this.orientation.left = 5;
        }

        else{
            if (this.orientation.right == 8)
                this.orientation.right = 6; 
            else if (this.orientation.right == 6 || this.orientation.right == 7)
                this.orientation.right = 8;
        }

        this.switchStep = this.switchStepReset;
    }
};





