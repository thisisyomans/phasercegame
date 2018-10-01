var config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	parent: 'gamecanvas',
	title: 'randomjsgame',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 500},
			debug: false
		}
	},
	scene : {
		key: 'gamekey',
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

var gamemap;
var player;
var keyboard;
var layerGround, layerCoin;
var text;

function preload(){
	//map load (Tiled, JSON format)
	this.load.tilemapTiledJSON('map', 'assets/map.json');

	//tiles load (spritesheet)
	this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

	//coin load
	this.load.image('coin', 'assets/coinGold.png');

	//player anims
	this.load.atlas('atlas', 'assets/player.png', 'assets/player.json');
}

function create(){
	//assign/load map
	gamemap = this.make.tilemap({key: 'map'});

	//ground layer tiles
	var groundTiles = gamemap.addTilesetImage('tiles');

	//ground layer
	layerGround = gamemap.createDynamicLayer('World', groundTiles, 0, 0);

	//layer for player to collide w/
	layerGround.setCollisionByExlcusion([-1]);

	//game boundaries
	this.physics.world.bounds.width = layerGround.width;
	this.physics.world.bounds.height = layerGround.height;

	//player sprite
	player = this.physics.add.sprite(200, 200, 'player');
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	this.physics.add.collider(layerGround, player);

	keyboard = this.input.keyboard.createCursorKeys();

	this.cameras.gamekey.setBounds(0, 0, gamemap.widthInPixels, gamemap.heightInPixels);
	this.cameras.gamekey.startFollow(player);
	this.cameras.gamekey.setBackgroundColor('#ccccff');
}

function update(){
	if (keyboard.left.isDown){
		player.body.setVelocityX(-200);
	}
	else if (keyboard.right.isDown){
		player.body.setVelocityX(200);
	}
	if ((keyboard.space.isDown || keyboard.up.isDown) && player.body.onFloor()){
		player.body.setVelocityY(-500);
	}
}
