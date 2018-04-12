// create a new scene named "Title"
let gameScene = new Phaser.Scene('Viewer');

var uiScale = 2;
var cursors;
var rt;
var curSpriteRow = 2;
var curSpriteCol = 6;
var rotation = 0;
var flipY = false;

let shipIndices = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','15','16','17','18','19','20','21','23','24','25','26','36','41','48','50'];

/*var spriteSlots = [
    [1,2,3,4,5,6,7,6,5,4,3,2],
    [14,13,12,11,10,9,8,9,10,11,12,13],
    [15,16,17,18,19,20,21,20,19,18,17,16],
    [28,27,26,25,24,23,22,23,24,25,26,27],
    [29,30,31,32,33,34,35,34,33,32,31,30]
];*/

var spriteSlots = [
    [29,30,31,32,33,34,35,34,33,32,31,30],
    [28,27,26,25,24,23,22,23,24,25,26,27],
    [15,16,17,18,19,20,21,20,19,18,17,16],
    [14,13,12,11,10,9,8,9,10,11,12,13],
    [1,2,3,4,5,6,7,6,5,4,3,2]
];


var shipSprites = [];
let imageSlot = [];
var shipSprite;
var lastUpdate;

// load asset files for our game
gameScene.preload = function() {
    
    this.load.path = 'assets/ships/';
    let shipIdx=0;
    let shipIdxStr;
    if (shipIdx < 10) {
        shipIdxStr = '0' + shipIdx;
    } else {
        shipIdxStr = shipIdx + '';
    }
    //for (let shipIdx=0; shipIdx<shipIndices.length; ++shipIdx) {
        for (let imgIdx=1;imgIdx<37;++imgIdx) {
            let imgIdxStr = imgIdx < 10 ? '0' + imgIdx : imgIdx + '';
            let shipKey = 'SHIP.V' + shipIdxStr;
            let filename = shipKey + '-Block000ShipExternalView-Image0' + imgIdxStr + '.png';
            this.load.image(shipKey + '-' + imgIdx, filename);
        }
    //}

};

// executed once, after assets were loaded
gameScene.create = function() {
    cursors = this.input.keyboard.createCursorKeys();

    /*
    rt = this.add.renderTexture(320, 200, 640, 400);
    for (let spriteIdx=1; spriteIdx<37; ++spriteIdx) {
        shipSprites[spriteIdx] = this.make.sprite({ key: 'SHIP.V00-' + spriteIdx, add: false });
    }
    rt.save();
    */
};

gameScene.update = function() {
    if (!lastUpdate) {
        lastUpdate = Date.now();
    } else {
        if (Date.now() - lastUpdate < 100) {
            return;
        }
        lastUpdate = Date.now();
    }

    if (cursors.left.isDown) {
        if (curSpriteCol > 0) {
            --curSpriteCol;
        } else {
            curSpriteCol = 11;
        }
    } else if (cursors.right.isDown) {
        if (curSpriteCol < 11) {
            ++curSpriteCol;
        } else {
            curSpriteCol = 0;
        }
    } else if (cursors.up.isDown) {
        gameScene.pushDown();
    } else if (cursors.down.isDown) {
        gameScene.pullUp();
    }

    if (shipSprite) {
      shipSprite.destroy();
    }
    let curSpriteIdx = spriteSlots[curSpriteRow][curSpriteCol];
    shipSprite = this.add.sprite(320,200,'SHIP.V00-' + curSpriteIdx).setFlipX(curSpriteCol > 6 || flipY).setFlipY(flipY);
}

gameScene.pullUp = function() {
    if (flipY) {
        curSpriteRow++;
    } else {
        curSpriteRow--;
    }
    gameScene.checkFlip();
}

gameScene.pushDown = function() {
    if (flipY) {
        curSpriteRow--;
    } else {
        curSpriteRow++;
    }
    gameScene.checkFlip();
}

gameScene.checkFlip = function() {
    let flipChanged = false;
    if (curSpriteRow == 5) {
        flipY = !flipY;
        curSpriteRow = 3;
        flipChanged = true;
    } else if (curSpriteRow == -1) {
        flipY = !flipY;
        curSpriteRow = 1;
        flipChanged = true;
    }
    if (flipChanged) {
        if (flipY) {
            curSpriteCol = curSpriteCol - 6;
            if (curSpriteCol < 0) {
                curSpriteCol += 12;
            }
        } else {
            curSpriteCol = curSpriteCol + 6;
            if (curSpriteCol > 11) {
                curSpriteCol -= 12;
            }
        }
    }
    console.log('curSpriteRow:' + curSpriteRow + ', flipY:' + flipY + ', curSpriteCol:' + curSpriteCol);

}

// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 640, // game width
  height: 400, // game height
  scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}