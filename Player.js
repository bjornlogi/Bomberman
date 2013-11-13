function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     this.sprite = this.sprite || g_sprites.players;
     this.setup(descr);
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
var i = 10;
Player.prototype.render = function (ctx) {

    var fadeThresh = Player.prototype.immunityTimer/10;

    if (this.immunityTimer/i-- < fadeThresh && this.immunity)
        ctx.globalAlpha = i%2;
    if (i==0){
        i=10;
        ctx.globalAlpha = 1;
    }

    var cel = g_sprites[this.playerOrientation];
    
    cel.drawAt(this.cx-this.halfWidth, this.cy-this.halfHeight);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    var pbr = {x: this.cx + this.halfWidth, y: this.cy + this.halfHeight};
    var ptl = {x: this.cx - this.halfWidth, y: this.cy - this.halfHeight};

    // ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight,this.halfWidth*2,this.halfHeight*2);
    // ctx.fillStyle="green";
    //uncomment this to draw top left and bottom right corner of the player for debugging
     // ctx.fillRect(pbr.x, pbr.y,4,4);
     // ctx.fillRect(ptl.x, ptl.y,5,5);
    // ctx.fillRect(this.cx, this.cy, 5, 5);
};

Player.prototype.switchStepReset=250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;


Player.prototype.KEY_FIRE   = ' '.charCodeAt(0);


Player.prototype.update = function (du) {
    if (this._isDeadNow)
        return entityManager.KILL_ME_NOW;

    if(this.immunity){
        this.immunityTimer -= du;
    }
    if (this.immunityTimer < 0){
        this.immunity = false;
        this.immunityTimer = Player.prototype.immunityTimer;
    }



    this.switchStep -= du;
    spatialManager.unregister(this);
    var dir = "down";
    this.nextX = this.cx;
    this.nextY = this.cy;
   	if (keys[this.KEY_UP]) {
        this.nextY = this.cy - this.velY*du;
        dir = "up";
        this.playerOrientation = this.orientation.up;
    }
    else if (keys[this.KEY_DOWN]) {
        this.nextY = this.cy + this.velY*du;
        dir = "down";
        this.playerOrientation = this.orientation.down;
    }
    else if (keys[this.KEY_LEFT]) {
        this.nextX = this.cx - this.velX*du;
        dir = "left";
        this.playerOrientation = this.orientation.currLeft;
    }
    else if (keys[this.KEY_RIGHT]) {
        this.nextX = this.cx + this.velX*du;
        dir = "right";
        this.playerOrientation = this.orientation.currRight;
    }

    this.updateSteps(dir);
    var rangeEntities = this.findHitEntity(nextX, nextY);
    if (rangeEntities.length == 0){
         this.cx = this.nextX;
        this.cy = this.nextY;
    }
    if (!this.immunity)
        spatialManager.register(this);
    //Droppa sprengju
    this.maybeDropBomb();

    
};

Player.prototype.immunityTimer = 1500/NOMINAL_UPDATE_INTERVAL;
Player.prototype.immunity = false;

Player.prototype.takeExplosion = function(){

    if (this.lives < 0 && !this.immunity){
        this.kill();
        this.lives--;
    }
    else {
        this.immunity = true;
        spatialManager.unregister(this);
    }
};


var isBomb = false;
Player.prototype.maybeDropBomb = function () {
    if (keys[this.KEY_FIRE] && isBomb === false) {
       var nearest = this.findNearest();
        entityManager.dropBomb(
           72+40*nearest.t, 75+40*nearest.s, this.bombReach, 15,15);
        isBomb = true;

        setTimeout(function(){
        isBomb = false;
        }, 5000)
   }
};

//finds the nearest empty block to drop the bomb
Player.prototype.findNearest = function(){
    var x = ((this.cx - 72) / 40).toFixed(0);
    if (x < 0) x = 0;
    var y = ((this.cy - 75) / 40).toFixed(0);
    if (y < 0) y = 0;
    return {t:x, s:y};
}

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





