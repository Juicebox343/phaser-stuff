import BombSpawner from './bombSpawner.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };


const game = new Phaser.Game(config);
let outerCircle;
let innerCircle;
let goalCircle;
let showDebug = false;

const SPEED = 0.05;

function preload(){
    this.load.image("outer", "assets/outer.png");
    this.load.image("inner", "assets/inner.png");
    this.load.image("goal", "assets/goal.png");
    this.load.image('bomb', 'assets/bomb.png');
}

function create(){
    let camera = this.cameras.main;
    camera.setBackgroundColor('F2F2F2')
    this.bombSpawner = new BombSpawner(this, 'bomb')
    const bombsGroup = this.bombSpawner.group
    // let outerCircle = this.add.image(400,300,'outer')
    outerCircle = this.physics.add.sprite(400,300,'outer')
    innerCircle = this.physics.add.sprite(400,300,'inner')
    goalCircle = this.physics.add.sprite(400,300, 'goal')

    this.keyboard = this.input.keyboard.addKeys('A, D, LEFT, RIGHT, SPACE');   
}

function update(){

    if(this.keyboard.A.isDown){
        outerCircle.rotation += SPEED;
    }
    if(this.keyboard.D.isDown){
        outerCircle.rotation -= SPEED;
    }
    if(this.keyboard.LEFT.isDown){
        innerCircle.rotation += SPEED;
    }
    if(this.keyboard.RIGHT.isDown){
        innerCircle.rotation -= SPEED;
    }
    this.bombSpawner.spawn()
}