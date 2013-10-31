"use strict";


var entityManager = {

_players   : [], 
_bullets : [],
_ships   : [],

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

deferredSetup : function () {
    this._categories = [this._players];
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