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
      const map = this.createWorld();    
      const resources = this.createResources(map.widthInPixels, map.heightInPixels);


      this.sound.play(CST.AUDIO.WORLD_MUSIC, {
        volume: 0.35,
        loop: true
      })

      // const map = this.make.tilemap({ key: "map" });

      // const tileset = map.addTilesetImage("homestead_spritesheet", "tiles")

      //Parameters: layer name (or index) from Tiled, tileset, x, y
      // const belowLayer = map.createStaticLayer("Grass", tileset, 0, 0);
      // const treeBase1 = map.createStaticLayer("Bottom1", tileset, 0, 0);
      // const treeBase2 = map.createStaticLayer("Bottom2", tileset, 0, 0);
      // const treeCrown1 = map.createStaticLayer("Top1", tileset, 0, 0);
      // const treeCrown2 = map.createStaticLayer("Top2", tileset, 0, 0);
      
      // treeBase1.setCollisionByProperty({ collides: true });
      // treeBase2.setCollisionByProperty({ collides: true });

      // treeCrown1.setDepth(11);
      // treeCrown2.setDepth(10);

      const eggPlants = this.createEggplants(map.widthInPixels, map.heightInPixels);
      this.createHero()
      const camera = this.cameras.main;
      camera.startFollow(this.hero);
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      // this.physics.add.collider(this.hero, [treeBase1, treeBase2]);

      this.physics.add.overlap(this.hero, eggPlants, this.collectStuff, null, this);
      // this.physics.add.overlap(this.hero, [treeBase1, treeBase2], this.breakDown, null, this);
    }

    update(time, delta){
      this.stateMachine.step();
      this.detectCollision(this.hero, this.children.list);
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
      console.log(this.children.list)
    }

  createEggplants(width, height){
    const eggPlants = this.physics.add.group({key: 'veggieAtlas', frame: 'Vegetables-10', repeat: 11})
    eggPlants.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
    })
    return eggPlants;
  }

  collectStuff(hero, stuff){
    stuff.disableBody(true, true)
  }

  breakDown(hero, stuff){

    console.log("tree")
  }

  createResources(width, height){
    const treeArray = [[0,0,0,0],
                      [0,1,1,0],
                      [0,1,1,0],
                      [0,0,0,0]];

    const trees = this.physics.add.group({key: 'tree', repeat: 31})
    trees.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
      child.setSize(child.width * 0.5, 45, child.width * 0.5, 0);
      child.setDepth(child.y);
      child.name = 'tree';
    })
    const rocks = this.physics.add.group({key: 'rock', repeat: 31})
    rocks.children.iterate((child) => {
      child.x = Phaser.Math.Between(0, width);
      child.y = Phaser.Math.Between(0, height);
      child.setSize(child.width, 10, child.width * 0.5, 0);
      child.setDepth(child.y);
      child.name = 'rock';
    })
    return trees, rocks;
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

  detectCollision(hero, gameObjects){

    gameObjects.forEach(function(object){
      if (hero.x < object.x + object.width && 
        hero.x + hero.width > object.x &&
        hero.y < object.y + object.height &&
        hero.y + hero.height > object.y) {
      }
    })
 
  }

}

