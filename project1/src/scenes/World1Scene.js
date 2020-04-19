import {CST} from "../CST.js";
import {StateMachine, State, IdleState, MoveState, HackState} from "../stateMachine.js";

export class World1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.WORLD1
        })
        this.hero = undefined;
    }

    init(){
    }

    preload(){

      this.load.image('tiles', './dist/assets/images/homestead_spritesheet.png');
      this.load.atlas("heroAtlas", "./dist/assets/sprites/hero.png", "./dist/assets/sprites/hero.json");
      this.load.atlas("veggieAtlas", "./dist/assets/sprites/veggies.png", "./dist/assets/sprites/veggies.json");
      this.load.tilemapTiledJSON('map', './dist/assets/images/homestead_map.json');

    }

    create(){
      const map = this.make.tilemap({ key: "map" });

      const tileset = map.addTilesetImage("homestead_spritesheet", "tiles")

      // Parameters: layer name (or index) from Tiled, tileset, x, y
      const belowLayer = map.createStaticLayer("Grass", tileset, 0, 0);
      const treeBase1 = map.createStaticLayer("Bottom1", tileset, 0, 0);
      const treeBase2 = map.createStaticLayer("Bottom2", tileset, 0, 0);
      const treeCrown1 = map.createStaticLayer("Top1", tileset, 0, 0);
      const treeCrown2 = map.createStaticLayer("Top2", tileset, 0, 0);
      
      treeBase1.setCollisionByProperty({ collides: true });
      treeBase2.setCollisionByProperty({ collides: true });

      treeCrown1.setDepth(11);
      treeCrown2.setDepth(10);

      this.createHero()
      const camera = this.cameras.main;
      camera.startFollow(this.hero);
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.physics.add.collider(this.hero, [treeBase1, treeBase2]);
      this.eggplant = this.physics.add.sprite(this.game.config.width / 2 + 200, this.game.config.height / 2, 'veggieAtlas', 'Vegetables-10');
      
    }

    update(time, delta){
      this.stateMachine.step();
      console.log(this.stateMachine.state)
    }
    

    createHero(){
      
      this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'heroAtlas', 'hero-27');
      this.hero.setSize(this.hero.width * 0.5, 56, this.hero.width * 0.5, -this.hero.width*2);
      this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
      
      this.hero.speed = 112;

      // The state machine managing the hero
      this.stateMachine = new StateMachine('idle', {
      idle: new IdleState(),
      move: new MoveState(),
      hack: new HackState(),
      }, 
      [this, this.hero]);


      this.anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 0, 
          end: 5
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'up-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 7, 
          end: 12
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 14, 
          end: 19
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'down-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 21, 
          end: 26
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'left-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 29, 
          end: 28
        }),
        frameRate: 8,
        repeat: 0
      });
     
      this.anims.create({
        key: 'up-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 32, 
          end: 31
        }),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'right-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 35, 
          end: 34
        }),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'down-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 38, 
          end: 37
        }),
        frameRate: 8,
        repeat: 0
      });
    }
  }