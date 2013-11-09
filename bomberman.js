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

function createInitialPlayers(NUM_PLAYERS) {

    entityManager._generatePlayer({
        cx : 80,
        cy : 45,
        velX: 1,
        velY: 1,
        rotation: 0,
        playerOrientation: 1,
        halfWidth: 10,
        halfHeight: 10,
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
    for(var i = 0; i < 5; i++)
    {
        nextX = 100;
        for (var j = 0; j < 5; j++) 
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
        for(var j = 0; j < 12; ++j)
        {
            entityManager.generateBoundary({
                cx : wallx,
                cy : wally
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
    // eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
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

    // if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    // if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    // if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

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

    //if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_sheets = {};

function requestPreloads() {
    var requiredSheets = {
        players   : "https://notendur.hi.is/~bls4/bombaman/images/bombermanPlayers.png"
        //ship2  : "https://notendur.hi.is/~pk/308G/images/ship_2.png",
        //rock   : "https://notendur.hi.is/~pk/308G/images/rock.png"
    };

    //var spriteSheet = "https://notendur.hi.is/~bls4/bombaman/images/bombermansheet.PNG";

    imagesPreload(requiredSheets, g_sheets, preloadDone);
}

var g_sprites = [];

var test = true;
function preloadDone() {

    var celWidth  = 497/20;
    var celHeight =  152/4;
    var numCols = 20;
    var numRows = test? 1:4;
    var numCels = test? 20:80;

    var sprite;

    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            if (col>8) celWidth += 0.7;
            sprite = new Sprite(g_sheets.players, col * celWidth, row * celHeight,
                                celWidth, celHeight) 
            g_sprites.push(sprite);
            if (col>8) celWidth -= 0.7;
        }
    }

    // for (var row = numRows/2; row < numRows/2; ++row) {
    //     for (var col = 0; col < numCols/2; ++col) {

    //         sprite = new Sprite(g_sheets.players, col * celWidth, row * celHeight,
    //                             celWidth, celHeight) 
    //         g_sprites.push(sprite);
    //     }
    // }
    //console.log(g_sprites);
    g_sprites.splice(numCels);
    createBrick();
    createBoundary();
    createInitialPlayers(NUM_PLAYERS);
    //createBrick();

    main.init();
}

// Kick it off
requestPreloads();
