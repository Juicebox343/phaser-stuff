import {CST} from "../CST.js";

export class World1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.WORLD1
        })

        this.hero = undefined;
        this.cursors = undefined;
        this.speed = 85;
        this.preVelocity = undefined;
    }

    init(){
    }

    preload(){
      this.load.image('tiles', './dist/assets/images/mountain_landscape.png');
      this.load.tilemapTiledJSON('map', './dist/assets/images/world1.json');
    }
    create(){
      const map = this.make.tilemap({ key: "map" });

      const tileset = map.addTilesetImage("mountains", "tiles");

      // Parameters: layer name (or index) from Tiled, tileset, x, y
      const belowLayer = map.createStaticLayer("Bottom", tileset, 0, 0);
      const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
      const aboveLayer = map.createStaticLayer("Top", tileset, 0, 0);
      belowLayer.setCollisionByProperty({ collides: true });
      aboveLayer.setDepth(10);

      this.createHero()
      const camera = this.cameras.main;
      camera.startFollow(this.hero);
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      console.log(this.hero.body)
      this.keyboard = this.input.keyboard.addKeys('W, A, S, D');

    }

    update(time, delta){

      let preVelocity = this.hero.body.prevVelocity = this.hero.body.velocity.clone();

      this.hero.body.setVelocity(0);
      

      if(this.keyboard.D.isDown === true){
        this.hero.body.setVelocityX(this.speed);
      } else if(this.keyboard.A.isDown === true){
        this.hero.body.setVelocityX(-this.speed);
      }

      if(this.keyboard.W.isDown === true){
        this.hero.body.setVelocityY(-this.speed);
      } else if(this.keyboard.S.isDown === true){
        this.hero.body.setVelocityY(this.speed);
      }

      this.hero.body.velocity.normalize().scale(this.speed);
      
      if(this.keyboard.D.isDown === true){
        this.hero.anims.play('right', true);
      } else if(this.keyboard.A.isDown === true){
        this.hero.anims.play('left', true);
      } else if(this.keyboard.W.isDown === true){
        this.hero.anims.play('up', true);
      } else if(this.keyboard.S.isDown === true){
        this.hero.anims.play('down', true);
      } else {
        this.hero.anims.stop();
   

    

      if (preVelocity.x < 0) this.hero.setTexture(CST.CHARACTERS.HERO, 6);
      else if (preVelocity.x > 0) this.hero.setTexture(CST.CHARACTERS.HERO, 20);
      else if (preVelocity.y < 0) this.hero.setTexture(CST.CHARACTERS.HERO, 13);
      else if (preVelocity.y > 0) this.hero.setTexture(CST.CHARACTERS.HERO, 27);
      }
    }


    createHero(){

      this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, CST.CHARACTERS.HERO);
  

      this.anims.create({
        key: 'left',
        frameRate: 6,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(CST.CHARACTERS.HERO, { start: 0, end: 5})
      })
      this.anims.create({
        key: 'up',
        frameRate: 6,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(CST.CHARACTERS.HERO, { start: 7, end: 12})
      })
      this.anims.create({
        key: 'right',
        frameRate: 6,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(CST.CHARACTERS.HERO, { start: 14, end: 19})
      })
      this.anims.create({
        key: 'down',
        frameRate: 6,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(CST.CHARACTERS.HERO, { start: 21, end: 26})
      })

    }
  }