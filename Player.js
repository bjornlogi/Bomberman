function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     this.sprite = this.sprite || sprites.players;
     this.setup(descr);

    this.intro.play();

};	

Player.prototype = new Entity(); 

Player.prototype.intro = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/131659__bertrof__game-sound-intro-to-game.wav");
Player.prototype.gameOver = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/43697__notchfilter__game-over02.wav");
Player.prototype.hit = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/Hit_Hurt36.wav");
Player.prototype.drop = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/Powerup.wav");



Player.prototype.lives = 3;
Player.prototype.bombReach = 3;

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

    if (this.immunity)
        this.flicker(ctx);

    var cel = sprites.players[this.playerOrientation];

    fadeThresh = Player.prototype.deathTimer/4;

    if (this._isDying)
        cel = this.death(ctx);    

    //cel = player_sprites[17]
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
    //ctx.fillRect(this.cx+3, this.cy, 5, 5);
};

var i = 10;
Player.prototype.flicker = function (ctx){
    var fadeThresh = Player.prototype.immunityTimer/10;
    if (this.immunityTimer/i-- < fadeThresh)
        ctx.globalAlpha = i%2;
    if (i==0){
        i=10;
        ctx.globalAlpha = 1;
    }
}

Player.prototype.death = function (ctx){
    var cel = sprites.players[16];
    if (this.deathTimer/2.8 < fadeThresh)
        cel = sprites.players[19];
    else if (this.deathTimer/2.9 < fadeThresh)
        cel = sprites.players[18];
    else if (this.deathTimer/3 < fadeThresh)
        cel = sprites.players[17]
    else if (this.deathTimer/5 < fadeThresh)
        cel = sprites.players[16]
    return cel;
}

Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.deathTimer = 2000/ NOMINAL_UPDATE_INTERVAL;
Player.prototype.bombs = 1;


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
    if (this._isDying){
        this.deathTimer -= du;
    }
    if (this.deathTimer < 0)
        this.kill();


    this.switchStep -= du;
    spatialManager.unregister(this);
    this.keyHandling(du);

    
    var rangeEntities = this.findHitEntity();
    if (rangeEntities.length == 0){
        this.advance();
    }else{
        this.maybeShiftOrPowerUp(rangeEntities, du);
    }
    
    if (!this.immunity)
        spatialManager.register(this);
    //Droppa sprengju
    this.maybeDropBomb();    
};

Player.prototype.advance = function(){
    this.cx = this.nextX;
    this.cy = this.nextY;
};

Player.prototype.keyHandling = function (du){
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
}

Player.prototype.maybeShiftOrPowerUp = function (entities, du){
    for (var entity in entities){
        var e = entities[entity];
        if (util.isBrick(e) && entities.length == 1){
            var eTop = util.getTopLeftCorner(e.cx,e.cy,e.halfWidth,e.halfHeight);
            var eBottom = util.getBottomRightCorner(e.cx,e.cy,e.halfWidth,e.halfHeight);
            var playerBottom = util.getBottomRightCorner(this.cx,this.cy,this.halfWidth,this.halfHeight);
            var playerTop = util.getTopLeftCorner(this.cx,this.cy,this.halfWidth,this.halfHeight);

            if (playerTop.y > e.cy && playerTop.y < eBottom.y)
                 this.cy += this.velY*du; 
            else if (playerBottom.y < e.cy && playerBottom.y > eTop.y)
                this.cy -= this.velY*du;
            else if (playerBottom.x > eTop.x && playerBottom.x < e.cx)
                this.cx -= this.velX*du;
            else if (playerTop.x < eBottom.x && playerTop.x > e.cx)
                this.cx += this.velX*du;
        }
        else if (e.powerUp != undefined){
            this.gainPowerUp(e.bePickedUp());
            this.advance();
        }
    }
}

Player.prototype.gainPowerUp = function (powerUp){
    switch (powerUp){
        case "Range" :
        this.bombReach += 1;
        break;
        case "Bombs":
        this.bombs += 1;
        break;
    }
}

Player.prototype.immunityTimer = 1500/NOMINAL_UPDATE_INTERVAL;
Player.prototype.immunity = false;

Player.prototype.takeExplosion = function(){

    if (this.lives == 0 && !this.immunity){
        this.blow();
        this.gameOver.play();

    }
    else {
        this.immunity = true;
        spatialManager.unregister(this);
        this.lives--;
        this.hit.play();
    }
};


var isBomb = false;
Player.prototype.maybeDropBomb = function () {
    if (keys[this.KEY_FIRE] && this.bombs > 0) {
        console.log("t");
        var nearest = this.findNearest();
        --this.bombs;
        entityManager.dropBomb(
           75+40*nearest.t, 75+40*nearest.s, 15,15,this);
        

        // setTimeout(function(){
        // isBomb = false;
        // }, 3000)
        this.drop.play();
   }
};

//finds the nearest empty block to drop the bomb
Player.prototype.findNearest = function(){
    var x = ((this.cx - 55) / 40).toFixed(0);
    if (x < 0) x = 0;
    var y = ((this.cy - 55) / 40).toFixed(0);
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

        this.switchStep = Player.prototype.switchStep;
    }
};





