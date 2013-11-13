"use strict";


var entityManager = {

_players   : [], 
_Bombs : [],
_Brick   : [],
_Boundary : [],
_explosions : [],
_Barrels : [],

// "PRIVATE" METHODS

// _generateRocks : function() {
//     var i,
//         NUM_ROCKS = 4;

//     for (i = 0; i < NUM_ROCKS; ++i) {
//         this.generateRock();
//     }
// },

KILL_ME_NOW : -1,

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
dropBomb: function(cx, cy, bombReach, hw, hh) {
    this._Bombs.push(new Bomb({
        halfWidth: hw,
        halfHeight: hh,
        cx   : cx-hw,
        cy   : cy-hh,
        bombReach : bombReach
    }));
},

explode: function (cx, cy, bombReach, hw, hh){
    //cx -= 25;
    //cy -= 25;
    this.explodeDirection(cx,cy,hh,hw, bombReach);

    this._generateExplosion({
        cx : cx,
        cy : cy,
        nextX : cx,
        nextY : cy,
        halfWidth: hw,
        halfHeight : hh
    });

},

explodeDirection : function (cx,cy,hw,hh, bombReach){
    var explode = {up:true, down: true, left: true, right:true};
    // for (var rangeE in rangeEntites){
    //     var r = rangeEntites[rangeE];
    //     if (cx-52 == r.cx && cy-15== r.cy){
    //         explode.left = false;     
    //     }
    //     else if (cx + 28 == r.cx && cy-15 == r.cy){
    //         explode.right = false;
    //     }
    //     else if ((cx - 12 == r.cx && cy-55 == r.cy)){
    //         explode.up = false;
    //     }
    //     else if ((cx-12 == r.cx && cy+25 == r.cy)){
    //         explode.down = false;
    //     }
    // }
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
                halfWidth : hw,
                halfHeight : hh,
                dir : dir
            };
            if (this._generateExplosion(descr)==this.KILL_ME_NOW)
                break;
            //this._generateExplosion(descr);
            }
        }
},

_generateExplosion : function(descr){
    var explosion = new Explosion(descr);
    if (explosion.update(1) == this.KILL_ME_NOW)
        //console.log(explosion.update(1));
        return this.KILL_ME_NOW;
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


deferredSetup : function () {
    this._categories = [this._explosions,this._Barrels, this._Bombs, 
                        this._Brick, this._Boundary, this._players];

},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

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