// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires 
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Get my (unique) spatial ID
    this._ID = spatialManager.getNewID();
    
    // I am not dead yet!
    this._isDeadNow = false;
    this._isDying = false;
};

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Entity.prototype.getNextPos = function (){
    return {x : this.nextX, y: this.nextY};
};

Entity.prototype.getHalfWidth = function () {
    return this.halfWidth;
};

Entity.prototype.getHalfHeight = function () {
    return this.halfHeight;
};

Entity.prototype.getID = function () {
    return this._ID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.blow = function () {
    this._isDying = true;
};

Entity.prototype.findHitEntity = function (isExplosion) {
    var pos = this.getPos();
    var nextPos = this.getNextPos();
    return spatialManager.findEntityInRange({
        cx : pos.posX, 
        cy : pos.posY, 
        halfWidth: this.getHalfWidth(), 
        halfHeight: this.getHalfHeight(), 
        nextX: nextPos.x, 
        nextY: nextPos.y,
        isExplosion : isExplosion
    });
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};

Entity.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};