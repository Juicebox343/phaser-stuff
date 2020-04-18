import {CST} from "../CST.js";

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
      this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    }

    update(time, delta){
      let moving = false;
      this.hero.setVelocity(0);

      if (!moving){
        this.hero.anims.stop();
        if (!this.hero.hacking){
          if(this.keyboard.SPACE.isDown){
            this.hero.hacking = true;
            this.hero.anims.play(`${this.hero.direction}-hack`, true);
            console.log(`${this.hero.direction}-hack`)
            this.hero.once('animationcomplete', () => {
              this.hero.anims.play(`${this.hero.direction}-walk`, true);
              this.hero.hacking = false;
            });
          } else {
            if(this.keyboard.D.isDown){
              this.hero.setVelocityX(this.hero.speed);
              this.hero.direction = "right";
              moving = true;
            } else if(this.keyboard.A.isDown){
              this.hero.setVelocityX(-this.hero.speed);
              this.hero.direction = "left";
              moving = true;
            } else if(this.keyboard.W.isDown){
              this.hero.setVelocityY(-this.hero.speed);
              this.hero.direction = "up";
              moving = true;
            } else if(this.keyboard.S.isDown){
              this.hero.setVelocityY(this.hero.speed);
              this.hero.direction = "down";
              moving = true;
            } 
            if(!moving){
              this.hero.anims.stop();
              if (this.hero.direction === "left") this.hero.setTexture('heroAtlas', 'hero-6');
              else if (this.hero.direction === "right") this.hero.setTexture('heroAtlas', 'hero-20');
              else if (this.hero.direction === 'up') this.hero.setTexture('heroAtlas', 'hero-13');
              else if (this.hero.direction === 'down') this.hero.setTexture('heroAtlas', 'hero-27');
            } else {
              console.log(`${this.hero.direction}-walk`)
              this.hero.anims.play(`${this.hero.direction}-walk`, true);
            }//else
          }//else
        }//if(!this.hero.hacking)
      }//if (!moving)
    }
    

    createHero(){
      this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'heroAtlas', 'hero-27');
      this.hero.body.setSize(this.hero.body.width * 0.5, 32, this.hero.body.width * 0.5, 0);

      this.hero.speed = 96;
      this.hero.hacking = false;
      this.hero.direction = "down";

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
          start: 28, 
          end: 30
        }),
        frameRate: 8,
        repeat: 0
      });
     
      this.anims.create({
        key: 'up-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 31, 
          end: 33
        }),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'right-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 34, 
          end: 36
        }),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'down-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 37, 
          end: 39
        }),
        frameRate: 8,
        repeat: 0
      });
    }
  }