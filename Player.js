function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     this.sprite = this.sprite || g_sprites.players;
};	

Player.prototype = new Entity(); 

var g_cel = 0;
Player.prototype.orientation = {
    down : 1,
    left : [3,4,5],
    right : [6,7,8],
    up : 10,
    currLeft : 4,
    switchLeft: true,
    currRight : 7,
    switchRight: true,
}

Player.prototype.render = function (ctx) {
    var cel = g_sprites[this.playerOrientation];
    cel.drawAt(this.cx,this.cy);

};

Player.prototype.switchStepReset=250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;


Player.prototype.KEY_FIRE   = ' '.charCodeAt(0);


//maybeFireBullet
Player.prototype.maybeDropBomb = function () {
    if (keys[this.KEY_FIRE]) {
       

        entityManager.dropBomb(
           this.cx, this.cy);
           
        
   }
};


Player.prototype.update = function (du) {
    spatialManager.unregister(this);
    var hitEntity = this.findHitEntity();
    this.switchStep -= du;
   	if (keys[this.KEY_UP]) {
        this.cy -= this.velY*du;
        this.updateSteps("up");
        this.playerOrientation = this.orientation.up;
    }
    else if (keys[this.KEY_DOWN]) {
        this.cy += this.velY*du;
        this.updateSteps("down");
        this.playerOrientation = this.orientation.down;
    }
    else if (keys[this.KEY_LEFT]) {
        this.cx -= this.velX*du;
        this.updateSteps("left");
        this.playerOrientation = this.orientation.currLeft;
    }
    else if (keys[this.KEY_RIGHT]) {
        this.cx += this.velX*du;
        this.updateSteps("right");
        this.playerOrientation = this.orientation.currRight;
    }
    spatialManager.register(this);

    //Droppa sprengju
    this.maybeDropBomb();
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
            var leftArray = this.orientation.left;
            var index = leftArray.indexOf(this.orientation.currLeft);

            if (index == 0 || index == 2)
                this.switchLeft = !this.switchLeft;
            this.switchLeft ? ++index : --index;
            this.orientation.currLeft = leftArray[index];
        }

        else{
            var rightArray = this.orientation.right;
            var index = rightArray.indexOf(this.orientation.currRight);

            if (index == 0 || index == 2)
                this.switchRight = !this.switchRight;
            this.switchRight ? ++index : --index;
            this.orientation.currRight = rightArray[index];
        }

        this.switchStep = this.switchStepReset;
    }
};





