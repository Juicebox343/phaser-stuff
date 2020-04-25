import {CST} from "../CST.js";
import {StateMachine, State, IdleState, MoveState, HackState} from "../stateMachine.js";
import {World} from "../worldGen.js";
import {Resource} from "../resourceManager.js";

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
      this.load.image('tree', './dist/assets/sprites/tree.png');
      this.load.image('rock', './dist/assets/sprites/rock.png');

      this.load.tilemapTiledJSON('map', './dist/assets/images/homestead_map.json');
      
      this.load.atlas("tileAtlas", "./dist/assets/images/homestead_spritesheet.png", "./dist/assets/images/homestead_spritesheet.json");  
      this.load.atlas("heroAtlas", "./dist/assets/sprites/hero.png", "./dist/assets/sprites/hero.json");
      this.load.atlas("veggieAtlas", "./dist/assets/sprites/veggies.png", "./dist/assets/sprites/veggies.json");  
    }

    create(){
      
      this.sound.play(CST.AUDIO.WORLD_MUSIC, {
        volume: 0.35,
        loop: true
      })
      const map = this.createWorld();    
      const eggPlants = this.createEggplants(map.widthInPixels, map.heightInPixels);
      this.resources = this.createResources(map.widthInPixels, map.heightInPixels);

      this.createHero()
      const camera = this.cameras.main;
      camera.startFollow(this.hero);
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      this.physics.add.overlap(this.hero, eggPlants, this.collectStuff, null, this);
      this.physics.add.collider(this.resources, this.hero, this.collidedWithMe, null, this);



    }
   
    update(time, delta){
      this.stateMachine.step();
    }







    collectStuff(hero, stuff){
      stuff.disableBody(true, true)
    }
  
    collidedWithMe(data){
      console.log(data)
    }
  
    breakDown(hero, stuff){
      console.log("tree")
    }
  
  
  









    
    createHero(){
      
      this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'heroAtlas', 'hero-27');
      this.hero.body.setSize(28, 46, true).setOffset(18, 19)
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

  createEggplants(width, height){
    const eggPlants = this.physics.add.group({key: 'veggieAtlas', frame: 'Vegetables-10', repeat: 11})
    eggPlants.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
    })
    return eggPlants;
  }











  createResources(width, height){
    const trees = this.physics.add.group({key: 'tree', repeat: 31})
    trees.name = "trees";
    trees.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
      child.setDepth(child.y);
      child.name = 'tree';
      child.body.setSize(58, 20).setOffset(32, 76);
      child.setImmovable();
    })

    const rocks = this.physics.add.group({key: 'rock', repeat: 31})
    rocks.name = "rocks";
    rocks.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
      child.setDepth(child.y);
      child.name = 'rock';
      child.body.setSize(32, 5).setOffset(2, 5);
      child.setImmovable();
    })
    return [trees, rocks];
  }



  createWorld(){
    const worldArray = [];
    for(let i = 0; i <= 24; i++){
        worldArray.push(Array.from({length: 50}, () => Math.floor(Math.random() * (24 - 16) + 16)))
    }
    const map = this.make.tilemap({data: worldArray, tileWidth: 32, tileHeight: 32});
    const tiles = map.addTilesetImage('tiles');
    const groundLayer = map.createStaticLayer(0, tiles, 0, 0)
    return map;
  }

}

