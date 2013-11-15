// =========
// BOMBERMAN
// =========
/*

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL PLAYERS
// ====================

var P1_UP = 'W'.charCodeAt(0);
var P1_DOWN = 'S'.charCodeAt(0);
var P1_LEFT = 'A'.charCodeAt(0);
var P1_RIGHT = 'D'.charCodeAt(0);

function createInitialPlayers(NUM_PLAYERS, width, height) {

    entityManager._generatePlayer({
        //-2 to cut off unused pixels in the spritesheet
        halfWidth: width/2-2,
        halfHeight: height/2,
        cx : 57,
        cy : 60,
        nextX : 57,
        nextY : 60,
        velX: 1.33,
        velY: 1.33,
        playerOrientation: 1,
        KEY_UP: P1_UP,
        KEY_DOWN: P1_DOWN,
        KEY_LEFT: P1_LEFT,
        KEY_RIGHT: P1_RIGHT
    });
    if (NUM_PLAYERS == 2){
        entityManager._generatePlayer({
        cx : 555,
        cy : 555,
        rotation : 0,
        halfWidth: 15,
        halfHeight: 15
    });
    }
    
}


var nextX;
var nextY = 100;
function createBrick()
{
    for(var i = 0; i < 6; i++)
    {
        nextX = 100;
        for (var j = 0; j < 6; j++) 
        {
        entityManager._generateBrick({
            cx : nextX,
            cy : nextY
    
        });
       
        nextX += 80;

    }
    nextY += 80;
    }
}

var wallx = 20;
var wally = 20;
function createBoundary()
{
    for(var i = 0; i < 4; ++i)
    {
        for(var j = 0; j < 14; ++j)
        {
            entityManager.generateBoundary({
                cx : wallx,
                cy : wally,
                color : "gray"
            });
                if(i === 0){
                wallx += 40;
            }
                if(i === 1){
                    wally += 40;
                }
                if(i===2){
                    wallx -=40;
                }
                if(i===3){
                    wally -= 40;
                }
        }

    }
}

function createBarrels()
{
  var chance = 0.3;     //líkar á að "barrel" verði til

  var locationX = 140;
  var locationY = 100;
  for(var i = 0; i < 6; i++)
  { 
    for(var j = 0; j < 7; j++)
    {

        if((Math.random()<chance) && !(i===5 && j===0))
        {
              entityManager._generateBarrels({
                  cx : locationX,
                  cy : locationY
              });
          }
         if(i===0 && j===4){j = 6;}
         if(i===5 && j===5){j = 6;}
          locationX += 80;
      }
        locationX = 60;
       locationY += 80;
    } 
    locationX = 140;
    locationY = 60;
    for(var k = 0; k<7;k++){
        for(var h=0; h<13;h++){
            if((Math.random()<chance) && !(k===6 &&
             (h<2 || h>10)))
            {
              entityManager._generateBarrels({
                  cx : locationX,
                  cy : locationY
              });
            }
            if(k===0 && h===8){h = 12;}
              locationX += 40;
        }
         locationX = 60;
            locationY +=80;
    }
}
// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    //player.update(du);
    entityManager.update(du);

    // // Prevent perpetual firing!
     eatKey(Player.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useDebug = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_DEBUG = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    // if (eatKey(KEY_MIXED))
    //     g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_DEBUG)) g_useDebug = !g_useDebug;

    // if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    // if (eatKey(KEY_HALT)) entityManager.haltShips();

    // if (eatKey(KEY_RESET)) entityManager.resetShips();

    // if (eatKey(KEY_0)) entityManager.toggleRocks();

    // if (eatKey(KEY_1)) entityManager.generateShip({
    //     cx : g_mouseX,
    //     cy : g_mouseY,
        
    //     sprite : g_sprites.ship});

    // if (eatKey(KEY_2)) entityManager.generateShip({
    //     cx : g_mouseX,
    //     cy : g_mouseY,
        
    //     sprite : g_sprites.ship2
    //     });

    // if (eatKey(KEY_K)) entityManager.killNearestShip(
    //     g_mouseX, g_mouseY);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {


    //player.render(ctx);

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_sheets = {};

function requestPreloads() {
    var requiredSheets = {
        players   : "https://notendur.hi.is/~bls4/bombaman/images/bombermanPlayers.png",
        brick  : "https://notendur.hi.is/~pap5/bomberman/sprite/arena_block.png",
        barrel   : "https://notendur.hi.is/~pap5/bomberman/sprite/40px-Red_Barrel.png",
        boundary : "https://notendur.hi.is/~pap5/bomberman/sprite/40px-Small_Rock.png",
        bomb :  "https://notendur.hi.is/~pap5/bomberman/sprite/bomb2.png",
        bombs :  "https://notendur.hi.is/~bls4/bombaman/images/bombsheet2.png",
        power1 : "https://notendur.hi.is/~pap5/bomberman/sprite/mush.png",
        fire : "https://notendur.hi.is/~pap5/bomberman/sprite/Fire.png"
    };

    //var spriteSheet = "https://notendur.hi.is/~bls4/bombaman/images/bombermansheet.PNG";

    imagesPreload(requiredSheets, g_sheets, preloadDone);
}


//var player_sprites = [];
//var bomb_sprites = [];

var sprites = {
    players : [],
    bomb : [],
    powerUp : [],
    explosion : [],
    barrel : [], 
    boundary : [],
    brick : []
};

function createPlayerSprites(){
    var celWidth  = 497/20;
    var celHeight =  152/4 - 4; // calibration for c.d.
    var numCols = 20;
    var numRows = test? 1:4;
    var numCels = test? 20:80;

    var player_sprites = sprites.players;

    var sprite;

    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            if (col>8) celWidth += 0.6;
            if (col==16) celWidth -= 0.1;
            if (col==18) celWidth -= 0.1;

            sprite = new Sprite(g_sheets.players, col * celWidth, row * celHeight,
                                celWidth, celHeight) 
            player_sprites.push(sprite);
            
            if (col>8) celWidth -= 0.6;
            if (col==16) celWidth -= 0.1;
            if (col==18) celWidth -= 0.08;
        }
    }
    player_sprites.splice(numCels);
    createInitialPlayers(NUM_PLAYERS, celWidth, celHeight);
}

function createBombSprites(){
    var bomb_sprites = sprites.bomb;
    var celWidth = 40;
    var celHeight = 40;
    var numCols = 4;
    var numRows = 1;
    var numCels = numCols*numCels;

    for (var col = 0; col < numCols; col++)
        bomb_sprites.push(new Sprite(g_sheets.bombs, col*celWidth, 0,
                            celWidth, celHeight));
}

var test = true;
function preloadDone() {

    createPlayerSprites();
      
    createBombSprites();

    sprites.brick.push(new Sprite(g_sheets.brick, 0, 0,
                                40, 40));
    sprites.barrel.push(new Sprite(g_sheets.barrel, 0, 0,
                                40, 40));
    sprites.boundary.push(new Sprite(g_sheets.boundary, 0, 0,
                                40, 40));
    sprites.powerUp.push(new Sprite(g_sheets.power1, 0, 0,
                                40, 40));
    sprites.explosion.push(new Sprite(g_sheets.fire, 0, 0,
                                40, 40));
    createBrick();
    createBoundary();
    createBarrels();
    

    main.init();
}

// Kick it off
requestPreloads();
