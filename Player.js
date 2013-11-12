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
    cel.drawAt(this.cx-this.width,this.cy-this.height);
    ctx.fillStyle = "white";
    var pbr = {x: this.cx, y: this.cy-3};
    var ptl = {x: this.cx - this.width, y: this.cy - this.height+3};
    //ctx.fillRect(this.cx - this.width, this.cy - this.height,this.width,this.height);

    //uncomment this to draw top left and bottom right corner of the player for debugging
    //ctx.fillRect(pbr.x, pbr.y,this.width/8,this.height/8);
    //ctx.fillRect(ptl.x, ptl.y,this.width/8,this.height/8);
};

Player.prototype.switchStepReset=250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;


Player.prototype.KEY_FIRE   = ' '.charCodeAt(0);


Player.prototype.update = function (du) {
    this.switchStep -= du;
    spatialManager.unregister(this);
    var dir = "down";
    var nextX = this.cx;
    var nextY = this.cy;
   	if (keys[this.KEY_UP]) {
        nextY = this.cy - this.velY*du;
        dir = "up";
        this.playerOrientation = this.orientation.up;
    }
    else if (keys[this.KEY_DOWN]) {
        nextY = this.cy + this.velY*du;
        dir = "down";
        this.playerOrientation = this.orientation.down;
    }
    else if (keys[this.KEY_LEFT]) {
        nextX = this.cx - this.velX*du;
        dir = "left";
        this.playerOrientation = this.orientation.currLeft;
    }
    else if (keys[this.KEY_RIGHT]) {
        nextX = this.cx + this.velX*du;
        dir = "right";
        this.playerOrientation = this.orientation.currRight;
    }

    this.updateSteps(dir);

    if (!this.isColliding(this.findHitEntity(), nextX, nextY)){
        this.cx = nextX;
        this.cy = nextY;
    }

    //Droppa sprengju
    this.maybeDropBomb();

    spatialManager.register(this);
};

Player.prototype.isColliding = function(rangeEntities, nextX, nextY){
    //some calibration due to the sprite being a bit off
    var pbrNext = {x: nextX, y: nextY - 3}; //bottomright corner of player
    var pbr = {x: this.cx, y: this.cy - 3};

    var ptlNext = {x: nextX - this.width+3, y: nextY - this.height+3}; //top right corner
    var ptl = {x: this.cx - this.width+3, y: this.cy - this.height+3};
    
    
    for (e in rangeEntities){
        var h = rangeEntities[e];
        //bottom right and top left corner of hit entity
        var hbr = {x: h.cx + h.halfWidth, y: h.cy + h.halfHeight};
        var htl = {x: h.cx - h.halfWidth, y: h.cy - h.halfHeight};
        //check right side of box 
        if ((ptlNext.x < hbr.x) && (ptl.x > hbr.x)){
             if ((ptl.y > htl.y && ptl.y < hbr.y) || (pbr.y > htl.y && pbr.y < hbr.y)){
                return true;
             }
         }
         //check left side of box
         else if (pbrNext.x > htl.x && pbr.x < htl.x){
            if ((pbr.y < hbr.y && pbr.y > htl.y) || (ptl.y > htl.y && ptl.y < hbr.y))
                return true;
         }
         else if ((ptlNext.y < hbr.y) && (ptl.y > hbr.y) || (pbrNext.y > htl.y) && (pbr.y < htl.y)){
            if (ptl.x > htl.x && ptl.x < hbr.x || pbr.x > htl.x && pbr.x < hbr.x)
                return true;

         }
    }
    return false;
}


var isBomb = false;
Player.prototype.maybeDropBomb = function () {
    if (keys[this.KEY_FIRE] && isBomb === false) {
       var nearest = this.findNearest();
        entityManager.dropBomb(
           72+40*nearest.t, 75+40*nearest.s);
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





