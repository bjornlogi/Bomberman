function Opponent(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

     this.setup(descr);

};  

Opponent.prototype = new Entity(); 
Opponent.prototype = new Player();
Opponent.prototype.direction = "up";
Opponent.prototype.preferedDirection = "upOrDown";
Opponent.prototype.droppedBomb = false;
Opponent.prototype.collision = false;
//Opponent.prototype.velX = 4;

// Opponent.prototype.render = function (ctx){
//  var pbr = {x: this.cx + this.halfWidth, y: this.cy + this.halfHeight};
//     var ptl = {x: this.cx - this.halfWidth, y: this.cy - this.halfHeight};
//  //   var rangeEntities = this.findHitEntity();
//     // var r = rangeEntities[0]
//     // util.fillBox(ctx, pbr.x, pbr.y, 5,5);
//     //  util.fillBox(ctx, ptl.x, ptl.y, 5,5);
//     //  util.fillBox(ctx, r.cx + r.halfWidth, r.cy + r.halfHeight, 5,5);
//     //  util.fillBox(ctx, r.cx - r.halfWidth, r.cy - r.halfHeight, 5,5);
// }


Opponent.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (entityManager.resetEM) return entityManager.KILL_ME_NOW;
    if (this._isDeadNow){
        //entityManager.updatePlayerPositions(this.NUM_PLAYER);
        return entityManager.KILL_ME_NOW;
    }

    if(this.immunity) this.immunityTimer -= du;
    else if (this._isDying) this.deathTimer -= du;

    if (this.immunityTimer < 0){
        this.immunity = false;
        this.immunityTimer = Player.prototype.immunityTimer;
    }

    if (this.deathTimer < 0) this.kill();


    this.switchStep -= du;
    this.walkHandling(du);
    //this.nextX = this.cx + this.velX*du;
    //this.nextY = this.cy
    var rangeEntities = this.findHitEntity();
    if (rangeEntities.length == 0 && !this._isDying){
        this.advance();
    }
    else {
        this.collision =true;
        if (this.bombs > 0) {
            for (var re in rangeEntities){
                var e = rangeEntities[re];
                if (util.isBarrel(e) || util.isPlayer(e)){
                    this.dropBomb();
                    this.droppedBomb = true;
                }
            }
        }
        this.maybeShiftOrPowerUp(rangeEntities, du);
        this.takeNextAction();
    }
    //}else this.maybeShiftOrPowerUp(rangeEntities, du);
    
    

    //if (eatKey(this.KEY_FIRE) && this.bombs > 0) this.dropBomb();    

    if (!this.immunity)
        spatialManager.register(this);
}

// Opponent.prototype.advance = function (){
//  this.cx = this.nextX;
// }

Opponent.prototype.walkHandling = function(du){
    this.nextX = this.cx;
    this.nextY = this.cy;
    if (this.direction == "up") {
        this.nextY = this.cy - this.velY*du;
        this.playerOrientation = this.orientation.up;
    }
    else if (this.direction == "down") {
        this.nextY = this.cy + this.velY*du;
        this.playerOrientation = this.orientation.down;
    }
    else if (this.direction == "left") {
        this.nextY = this.cy
        this.nextX = this.cx - this.velX*du;
        this.playerOrientation = this.orientation.currLeft;
    }
    else if (this.direction == "right") {
        this.nextY = this.cy
        this.nextX = this.cx + this.velX*du;
        this.playerOrientation = this.orientation.currRight;
    }
    if(this.switchStep < 0){
        this.updateSteps(this.direction);
    }
}

/*
    This is called when the opponent halts. The basic logic is
    that when that happens, the robot drops a bomb and tries 
    first to reverse and then go up or down if it was moving 
    sideways and vice versa.
*/

Opponent.prototype.takeNextAction = function(){
    var x = this.cx;
    var y = this.cy;
    if (this.droppedBomb){
        this.determinePreferedDirection();
        this.droppedBomb = false;
    }
    //if (!this.reverseDir())
    this.attemptToMoveInPreferedDirection();
}

Opponent.prototype.determinePreferedDirection = function (){
    if (this.direction == "left" || this.direction == "right")
            this.preferedDirection = "upOrDown";
        else this.preferedDirection = "sideways";
}

Opponent.prototype.attemptToMoveInPreferedDirection = function(){

    if (this.preferedDirection == "sideways"){
        if (util.canMoveToTheRight(this)){
                    this.direction = "right";
                    this.preferedDirection = "upOrDown";
                }
        else if (util.canMoveToTheLeft(this)){
                    this.direction = "left";
                    this.preferedDirection = "upOrDown";
                }
        else {
            this.reverseDir();
        }
    }
    else if (this.preferedDirection == "upOrDown"){
        if (util.canMoveForwards(this)){
                this.direction = "up";
                this.preferedDirection = "sideways";
            }
        else if (util.canMoveBackwards(this)){
            this.direction = "down";
            this.preferedDirection = "sideways";
        }
        else {
            this.reverseDir();
        }
    }
}

Opponent.prototype.reverseDir = function(){
    if (this.direction == "up") this.direction = "down";
    else if (this.direction == "down") this.direction = "up";
    else if (this.direction == "right") this.direction = "left";
    else this.direction = "right"
}




