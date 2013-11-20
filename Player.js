function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     // this.sprite = this.sprite || sprites.players;
     this.setup(descr);
    // this.intro.play();
};	

Player.prototype = new Entity(); 


Player.prototype.gameOver = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/43697__notchfilter__game-over02.wav");
Player.prototype.hit = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/Hit_Hurt36.wav");
Player.prototype.drop = new Audio(
  "https://notendur.hi.is/~pap5/bomberman/sound/Powerup.wav");

Player.prototype.nextX = 57,
Player.prototype.nextY = 60,
Player.prototype.velX = 1.33,
Player.prototype.velY = 1.33,
Player.prototype.playerOrientation = 1,
Player.prototype.lives = 3;
Player.prototype.bombReach = 3;

/*
    Render related stuff
*/
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

    var sprite;
    var cel;

    fadeThresh = Player.prototype.deathTimer/4;

    if (this._isDying)
        cel = this.deathAnimation(ctx,cel);
    else cel = this.sprites[this.playerOrientation];

    if (!this._isDeadNow)
        cel.drawAt(this.cx-this.halfWidth, this.cy-this.halfHeight);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    var pbr = {x: this.cx + this.halfWidth, y: this.cy + this.halfHeight};
    var ptl = {x: this.cx - this.halfWidth, y: this.cy - this.halfHeight};
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

Player.prototype.deathAnimation = function (ctx,cel){
    if (this.deathTimer/2.8 < fadeThresh)
        cel = this.sprites[19];
    else if (this.deathTimer/2.9 < fadeThresh)
        cel = this.sprites[18];
    else if (this.deathTimer/3 < fadeThresh)
        cel = this.sprites[17];
    else if (this.deathTimer/5 < fadeThresh)
        cel = this.sprites[16];
    return cel;
}

Player.prototype.switchStep = 250 / NOMINAL_UPDATE_INTERVAL;
Player.prototype.deathTimer = 2000/ NOMINAL_UPDATE_INTERVAL;
Player.prototype.bombs = 1;

/*
    Update related stuff
*/

Player.prototype.update = function (du) {

    spatialManager.unregister(this);
    if (entityManager.resetEM) return entityManager.KILL_ME_NOW;
    if (this._isDeadNow){
        entityManager.handleDeath(this.NUM_PLAYER);
        return;
        //return entityManager.KILL_ME_NOW;
    }

    if(this.immunity) this.immunityTimer -= du;
    else if (this._isDying) this.deathTimer -= du;

    if (this.immunityTimer < 0){
        this.immunity = false;
        this.immunityTimer = Player.prototype.immunityTimer;
    }

    if (this.deathTimer < 0) this.kill();


    this.switchStep -= du;
    this.keyHandling(du);
    
    var rangeEntities = this.findHitEntity();
    if (rangeEntities.length == 0 && !this._isDying){
        this.advance();
    }else this.maybeShiftOrPowerUp(rangeEntities, du);
    
    

    if (eatKey(this.KEY_FIRE) && this.bombs > 0) this.dropBomb();    

    if (!this.immunity)
        spatialManager.register(this);
};

Player.prototype.advance = function(){
    this.cx = this.nextX;
    this.cy = this.nextY;
};

Player.prototype.keyHandling = function (du){
    var dir;
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
    if(this.switchStep < 0 && dir != undefined){
        this.updateSteps(dir);
    }
        
};

Player.prototype.setPositionToDefault = function(keyCode){
     if (keyCode == this.KEY_UP) this.playerOrientation = 10;
     if (keyCode == this.KEY_DOWN) this.playerOrientation = 1;
     if (keyCode == this.KEY_LEFT) this.playerOrientation = 4;
     if (keyCode == this.KEY_RIGHT) this.playerOrientation = 7;
}

Player.prototype.maybeShiftOrPowerUp = function (entities, du){
    for (var entity in entities){
        var e = entities[entity];
        if (util.isBrick(e) && entities.length == 1){
            var velMagnitude = util.shiftIfAlmostThrough(e,this);
            this.cx += velMagnitude.x*Player.prototype.velX*du;
            this.cy += velMagnitude.y*Player.prototype.velY*du;
        }
        else if (util.isPowerUp(e)){
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
        case "Speed":
        this.velX += 0.5;
        this.velY += 0.5;
        break;
    }
}

Player.prototype.immunityTimer = 1500/NOMINAL_UPDATE_INTERVAL;
Player.prototype.immunity = false;

Player.prototype.takeExplosion = function(){
    --this.lives;
    if (this.lives == 0 && !this.immunity){
        this.blow();
        this.gameOver.play();

    }
    else {
        this.immunity = true;
        spatialManager.unregister(this);
        this.hit.play();
    }
    frontEndManager.playerLives["player"+this.NUM_PLAYER] = this.lives;
};


Player.prototype.dropBomb = function () {
        var nearest = util.findNearestSpotForBomb(this.cx,this.cy);
        --this.bombs;
        entityManager.dropBomb(
           75+40*nearest.t, 75+40*nearest.s, 15,15,this);
        this.drop.play();
};

Player.prototype.updateSteps = function(keyPressed){
        if (keyPressed === "down"){
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

            if (index == 0 || index == 2){
                this.orientation.switchLeft = !this.orientation.switchLeft;
            }
            this.orientation.switchLeft ? --index : ++index;
            this.orientation.currLeft = leftArray[index];
            
        }

        else if (keyPressed == "right"){
            var rightArray = this.orientation.right;
            var index = rightArray.indexOf(this.orientation.currRight);

            if (index == 0 || index == 2)
                this.orientation.switchRight = !this.orientation.switchRight;
            this.orientation.switchRight ? ++index : --index;
            this.orientation.currRight = rightArray[index];
        }
        this.switchStep = Player.prototype.switchStep;
};


Player.prototype.incrementBombs = function(){
    this.bombs++;
}


