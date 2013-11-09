"use strict";


var entityManager = {

_players   : [], 
_Bombs : [],
_Brick   : [],
_Boundary : [],

// "PRIVATE" METHODS

// _generateRocks : function() {
//     var i,
//         NUM_ROCKS = 4;

//     for (i = 0; i < NUM_ROCKS; ++i) {
//         this.generateRock();
//     }
// },

_generatePlayer : function(descr) {
    this._players.push(new Player(descr));
},

_generateBrick : function(descr){
    this._Brick.push(new Brick(descr));
},

_generateBricks : function() {
   
        this.generateBrick();
        
},

//fireBullet
dropBomb: function(cx, cy) {
    this._Bombs.push(new Bomb({
        cx   : cx,
        cy   : cy,
        
    }));
},

generateBoundary : function(descr){
    this._Boundary.push(new Boundary(descr));
},

_generateBoundaries : function(descr){
    this.generateBoundary();
},


deferredSetup : function () {
    this._categories = [this._Brick, this._Boundary, this._Bombs, this._players];

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
            var status = aCategory[i++].update(du);
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