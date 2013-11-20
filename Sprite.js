// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image, sx, sy, width, height) {
    this.image = image;
    // this.width = image.width;
    // this.height = image.height;
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.scale = 1;
}

Sprite.prototype.drawAt = function (x, y, lctx) {
    if (lctx == undefined)
        ctx.drawImage(this.image, 
                      this.sx, this.sy, this.width, this.height,
                      x, y, this.width, this.height);
    else
        lctx.drawImage(this.image, 
                      this.sx, this.sy, this.width, this.height,
                      x, y, this.width, this.height);
}
