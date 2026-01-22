
/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, // current animation frame of sprite image
    spriteDirection: 1,
    helmetCount: 0,
    harnischCount: 0,
    skirtCount: 0,
    shoesCount: 0,
    animationCounter: 0 // Counter für langsamere Animation
}

const SIZE = 2;

PLAYER.box.style.transform = `scale(${SIZE})`;

let redBox = document.getElementById("redBox");

/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function movePlayer(dx, dy, dr) {
    // save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // calculate new position
    let newX = originalX + dx;
    let newY = originalY + dy;

    // Surface Grenzen (800x600)
    const SURFACE_WIDTH = 800;
    const SURFACE_HEIGHT = 600;
    const PLAYER_WIDTH = 18.5;
    const PLAYER_HEIGHT = 24;

    // Grenzen-Überprüfung
    if (newX < 0) {
        newX = 0;
    }

    if (newX + PLAYER_WIDTH > SURFACE_WIDTH) {
        newX = SURFACE_WIDTH - PLAYER_WIDTH;
    }

    if (newY < 0) {
        newY = 0;
    }
    
    if (newY + PLAYER_HEIGHT > SURFACE_HEIGHT) {
        newY = SURFACE_HEIGHT - PLAYER_HEIGHT;
    }

    // Neue Position setzen
    PLAYER.box.style.left = newX + 'px';
    PLAYER.box.style.top = newY + 'px';

    // update sprite direction if needed
    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${dr * SIZE}) scaleY(${SIZE})`;
    }

    // output in debugger box
    updateScoreDisplay();
}

function updateScoreDisplay() {
    GAME_SCREEN.debug_output.innerHTML = `<p>Helmet count: ${PLAYER.helmetCount} </p><p>Harnisch count: ${PLAYER.harnischCount} </p><p>Skirt count: ${PLAYER.skirtCount} </p><p>Shoes count: ${PLAYER.shoesCount}`;
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
    if (PLAYER.spriteImgNumber < 11) { // switch to next sprite position
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 17.475; // Ghost Sprite-Breite (16px pro Frame)
        PLAYER.spriteImg.style.right = x + "px";
    } else { // animation loop finished: back to start animation
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}

