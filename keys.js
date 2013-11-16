// =================
// KEYBOARD HANDLING
// =================

var keys = [];

function handleKeydown(evt) {
    keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    keys[evt.keyCode] = false;
    //reset the position when the player halts if not dead
    var player1 = entityManager._players[0];
    util.setPositionToDefault(evt.keyCode)
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
