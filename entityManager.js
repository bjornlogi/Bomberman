"use strict";


var entityManager = {

_players   : [], 
_Bombs : [],
_Brick   : [],
_Boundary : [],
_explosions : [],
_Barrels : [],
_PowerUp : [],
resetEM : false,

// "PRIVATE" METHODS


KILL_ME_NOW : -1,
KILL_ME_CHILDREN : -2,

_generatePlayer : function(descr) {
    this._players.push(new Player(descr));
},

_generateBrick : function(descr){
    this._Brick.push(new Brick(descr));
},

_generateBricks : function() {
    this.generateBrick();    
},

_generateBarrels : function(descr){
    this._Barrels.push(new Barrel(descr));
},

//fireBullet
dropBomb: function(cx, cy, hw, hh, bombReach, player) {
    this._Bombs.push(new Bomb({
        cx   : cx-hw,
        cy   : cy-hh,
        bombReach : bombReach,
        player : player
    }));
},

explode: function (cx, cy, bombReach, hw, hh){
    this.explodeDirection(cx,cy,hh,hw, bombReach);

    this._generateExplosion({
        cx : cx,
        cy : cy,
        nextX : cx,
        nextY : cy
    });

},

explodeDirection : function (cx,cy,hw,hh, bombReach){
    var explode = {up:true, down: true, left: true, right:true};
    var x, y; 
    for (var dir in explode){
        var h=0;
        var w=0;
        switch (dir){
            case "up":
                h = -1;
                x=cx;
                y=cy-hh*2;
                break;
            case "down":
                h=1;
                x=cx;
                y=cy+hh*2;
                break;
            case "left":
                w = -1;
                x=cx-hw*2;
                y=cy;
                break;
            case "right":
                w = 1;
                x = cx+hw*2;
                y = cy;
                break;
            }
        for (var i = 0; i < bombReach; i++){
            var descr = {
                nextX : x + i*w*hw,
                nextY : y + i*h*hh,
                cx : cx ,
                cy : cy,
                dir : dir
            };
            if (this._generateExplosion(descr)==this.KILL_ME_NOW)
                break;
            }
        }
},

_generateExplosion : function(descr){
    var explosion = new Explosion(descr);
    var msg = explosion.update(1);
    if (msg == this.KILL_ME_NOW)
        return this.KILL_ME_NOW;
    else if (msg == this.KILL_ME_CHILDREN){
        this._explosions.push(explosion);
        return this.KILL_ME_NOW;
    }
    else
        this._explosions.push(explosion);
    return;
},

generateBoundary : function(descr){
    this._Boundary.push(new Boundary(descr));
},

_generateBoundaries : function(descr){
    this.generateBoundary();
},

powerUps : ["Range", "Bombs", "Speed"], 

generatePowerUp : function(cx,cy,pu){
    this._PowerUp.push(new PowerUp({
        cx : cx,
        cy : cy,
        powerUp : this.powerUps[pu]
    }));
},

updatePlayerPositions : function(playerWhoDied){
    var lastPlayer = this._players.length-1;
    if (lastPlayer == 1){ 
        frontEndManager.updateWinner(
        playerWhoDied == 0 ? 1 : 0
        );
    }
    else if (lastPlayer == 0) frontEndManager.updateWinner(-1); //one player mode and player dies
    if (lastPlayer < 2) {this._reset();return;};
    if (playerWhoDied == lastPlayer) return;
    for (var i = playerWhoDied; i <= lastPlayer; ++i){
        --this._players[i].NUM_PLAYER;
    }
},


deferredSetup : function () {
    this._categories = [this._explosions,this._Barrels, this._Bombs, 
                        this._Brick, this._Boundary, this._PowerUp, this._players];

},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

_reset: function(du){
    for (var c = 0; c < this._categories.length; ++c) {
        this._categories[c].length = 0;
    }
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        if (this.resetEM) aCategory.length = 0;

        while (i < aCategory.length) {
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
        }
        else {
                ++i;
            }
    }
    if (this.resetEM) {createObjects(); this.resetEM = false;}
}

},

render: function(ctx) {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(ctx);
        }
    }

    
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();