var game = new Phaser.Game(640, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('field', 'assets/field.png');
    game.load.image('vengeance', 'assets/vengeance.png');
    game.load.image('newGame', 'assets/newgame2.png');
    game.load.image('resumeGame', 'assets/resumegame2.png');
}

function create() {
}

function update() {
}
