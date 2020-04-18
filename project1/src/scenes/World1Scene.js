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
        this.facingDirection = "down";
        this.isAttacking = false;
    }

    init(){
    }

    preload(){

      this.load.image('tiles', './dist/assets/images/homestead_spritesheet.png');
      // this.load.image('trees', './dist/assets/images/tree2-final.png');

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
      let preVelocity = this.hero.body.prevVelocity = this.hero.body.velocity.clone();
      


      this.hero.body.setVelocity(0);
      
      

      if(this.keyboard.D.isDown === true){
          this.hero.body.setVelocityX(this.speed);
          this.hero.anims.play('right-walk', true);
      } else if(this.keyboard.A.isDown === true){
          this.hero.body.setVelocityX(-this.speed);
          this.hero.anims.play('left-walk', true);
      } else if(this.keyboard.W.isDown === true){
          this.hero.body.setVelocityY(-this.speed);
          this.hero.anims.play('up-walk', true);
      } else if(this.keyboard.S.isDown === true){
          this.hero.anims.play('down-walk', true);
          this.hero.body.setVelocityY(this.speed);
      } else if(this.keyboard.SPACE.isDown === true){
        if (this.facingDirection === 'left') {
          this.hero.anims.play('left-hack', this.attackThem());
        }else if (this.facingDirection === 'right'){
          this.hero.anims.play('right-hack');
        } 
        else if (this.facingDirection === 'up'){
          this.hero.anims.play('up-hack');
        } 
        else if (this.facingDirection === 'down'){
          this.hero.anims.play('down-hack');
        }
      }  else {
          this.hero.anims.stop();
          if (this.facingDirection === "left") this.hero.setTexture('heroAtlas', 'hero-6');
          else if (this.facingDirection === "right") this.hero.setTexture('heroAtlas', 'hero-20');
          else if (this.facingDirection === 'up') this.hero.setTexture('heroAtlas', 'hero-13');
          else if (this.facingDirection === 'down') this.hero.setTexture('heroAtlas', 'hero-27');
      }

      this.hero.body.velocity.normalize().scale(this.speed);

      if (preVelocity.x < 0) this.facingDirection = "left";
      else if (preVelocity.x > 0) this.facingDirection = "right";
      else if (preVelocity.y < 0) this.facingDirection = 'up';
      else if (preVelocity.y > 0) this.facingDirection = 'down';   
    }

    attackThem(){
      
    }

    createHero(){

      this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'heroAtlas', 'hero-27');

      this.hero.body.setSize(this.hero.body.width * 0.5, 32, this.hero.body.width * 0.5, 0);

      // sprite.body.setSize(boundWidth, boundHeight, boundOffsetX, boundOffsetY);

       this.anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 0, 
          end: 5
        }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'up-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 7, 
          end: 12
        }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 14, 
          end: 19
        }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'down-walk',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 21, 
          end: 26
        }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'left-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 28, 
          end: 30
        }),
        frameRate: 6
      });
     
      this.anims.create({
        key: 'up-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 31, 
          end: 33
        }),
        frameRate: 6
      });

      this.anims.create({
        key: 'right-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 34, 
          end: 36
        }),
        frameRate: 6
      });

      this.anims.create({
        key: 'down-hack',
        frames: this.anims.generateFrameNames('heroAtlas', {
          prefix: 'hero-', 
          start: 37, 
          end: 39
        }),
        frameRate: 6
      });
    }
  }