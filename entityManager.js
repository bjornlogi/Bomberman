"use strict";


var entityManager = {

_players   : [], 
_bullets : [],
_brick   : [],

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
    this._brick.push(new brick(descr));
},

_generateBricks : function() {
    var i,
        NUM_BRICKS = 4;

    for (i = 0; i < NUM_BRICKS; ++i) {
        this.generateBrick();
        this.cx += 30;
    }
},

deferredSetup : function () {
    this._categories = [this._players, this._brick];

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