// create a new scene named "Title"
let gameScene = new Phaser.Scene('Title');

var uiScale = 2;

// load asset files for our game
gameScene.preload = function() {

    gameScene.loadAudio();

    // load images
    this.load.image('field', 'assets/field.png');
    this.load.image('vengeance', 'assets/vengeance.png');
    this.load.image('newGame', 'assets/newgame2.png');
    this.load.image('resumeGame', 'assets/resumegame2.png');

    this.load.path = 'assets/anims/';

    for (let wcidx = 1; wcidx < 27; ++wcidx) {
        let idxStr = wcidx < 10 ? '0' + wcidx : wcidx;
        this.load.image('wc-' + wcidx, 'WC-' + idxStr + '.png');
    }
    
    for (let seqidx = 1; seqidx < 7; ++seqidx) {
        this.load.image('II-'+seqidx, 'II-' + seqidx + '.png');
    }
};

gameScene.loadAudio = function() {
    this.load.audio('theme', 'assets/audio/35-maintheme.mp3');
}

// executed once, after assets were loaded
gameScene.create = function() {


    //createMousePointerStuff();

    this.anims.create({
        key: 'Title-WingCommander',
        //frames: this.anims.generateFrameNumbers('wc-', {start:1,end:26}),
        frames: [
            {key: 'wc-1'},{key: 'wc-2'},{key: 'wc-3'},{key: 'wc-4'},{key: 'wc-5'},{key: 'wc-6'},{key: 'wc-7'},{key: 'wc-8'},{key: 'wc-9'},{key: 'wc-10'},
            {key: 'wc-11'},{key: 'wc-12'},{key: 'wc-13'},{key: 'wc-14'},{key: 'wc-15'},{key: 'wc-16'},{key: 'wc-17'},{key: 'wc-18'},{key: 'wc-19'},{key: 'wc-20'},
            {key: 'wc-21'},{key: 'wc-22'},{key: 'wc-23'},{key: 'wc-24'},{key: 'wc-25'},{key: 'wc-26'}
        ],
        frameRate: 16
    });

    this.anims.create({
        key: 'Title-II',
        frames: [{key: 'II-1'},{key: 'II-2'},{key: 'II-3'},{key: 'II-4'},{key: 'II-5'},{key: 'II-6'}],
        frameRate: 16
    });

    gameScene.addMusic();

    let field = this.add.sprite(320,200,'field');
    field.setScale(uiScale);

    let animSprite = this.add.sprite(320, 200, 'wc-1').play('Title-WingCommander');
    animSprite.setScale(uiScale);

    timedEvent = this.time.addEvent({ delay: 2500, callback: addII, callbackScope: this });
    timedEvent = this.time.addEvent({ delay: 3500, callback: addVengeance, callbackScope: this });
    timedEvent = this.time.addEvent({ delay: 3500, callback: addNewContinue, callbackScope: this });
};

function createMousePointerStuff() {
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
        {
            game.input.mouse.releasePointerLock();
        }
    }, 0, this);

}

function addII() {
    animSprite = this.add.sprite(320, 200, 'II-1').play('Title-II');
    animSprite.setScale(uiScale);
}

function addVengeance() {
    let vengeance = this.add.sprite(320,200,'vengeance');
    vengeance.setScale(uiScale);
}

function addNewContinue() {
    let newCont = this.add.sprite(320,275, 'newGame').setInteractive();
    newCont.setScale(uiScale);
    newCont.on('pointerdown', function (pointer) {
        console.log("New Game");
    });

    newCont = this.add.sprite(320,360, 'resumeGame').setInteractive();
    newCont.setScale(uiScale);
    newCont.on('pointerdown', function (pointer) {
        console.log("Resume Game");
    });
}

gameScene.addMusic = function () {
    var music = this.sound.add('theme');
    music.play();
}

function addMouse() {
    //game.input.mouse.capture = true;
    this.input.on('pointerup', handleClick);
}

handleClick = function(pointer) {
    console.log("click " + pointer.x + ", " + pointer.y);
}

// executed on every frame (60 times per second)
/*gameScene.update = function() {
 
    // check for active input
    if (this.input.activePointer.isDown) {
   
      // player walks
    }
};*/

// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 640, // game width
  height: 400, // game height
  scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
//let animManager = new Phaser.Animations.AnimationManager(game);