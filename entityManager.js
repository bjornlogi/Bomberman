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
dropBomb: function(cx, cy, bombReach, rangeEntites) {
    this._Bombs.push(new Bomb({
        cx   : cx,
        cy   : cy,
        bombReach : bombReach
    }));
},

explode: function (cx, cy, bombReach){

    this.explodeDirection(cx,cy);

    this._explosions.push(new Explosion({
        cx : cx-30,
        cy : cy-25
    }));

},

explodeDirection : function (cx,cy){
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
            switch (dir){
                case "up":
                    x=cx-30;
                    y=cy-45;
                    break;
                case "down":
                    x=cx-30;
                    y=cy-5;
                    break;
                case "left":
                    x=cx-50;
                    y=cy-25;
                    break;
                case "right":
                    x = cx-10;
                    y = cy-25;
                    break;
                }
            this._explosions.push(new Explosion({
            cx : x,
            cy : y,
            dir : dir
            }));
        }
},

generateBoundary : function(descr){
    this._Boundary.push(new Boundary(descr));
},

_generateBoundaries : function(descr){
    this.generateBoundary();
},


deferredSetup : function () {
    this._categories = [this._Barrels, this._Bombs, this._Brick, this._Boundary, this._players, this._explosions];

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