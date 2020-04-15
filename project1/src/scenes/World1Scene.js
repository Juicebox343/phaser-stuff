import {CST} from "../CST.js";

export class World1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.WORLD1
        })
    }
    init(){
    }

    

    preload(){
        

    }
    create(){
        let hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, CST.CHARACTERS.HERO);

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

        this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
    }

    update(time, delta){
          // Stop any previous movement from the last frame
         hero.body.setVelocity(0);
        
          // Horizontal movement
          if (cursors.left.isDown) {
            hero.body.setVelocityX(-100);
          } else if (cursors.right.isDown) {
            hero.body.setVelocityX(100);
          }
        
          // Vertical movement
          if (cursors.up.isDown) {
            hero.body.setVelocityY(-100);
          } else if (cursors.down.isDown) {
            hero.body.setVelocityY(100);
          }
        
          // Normalize and scale the velocity so that hero can't move faster along a diagonal
          hero.body.velocity.normalize().scale(speed);
        }
    }


















//         if(this.keyboard.D.isDown === true){
//             this.hero.x = this.hero.x + 64 * (delta / 1000);
//             this.hero.anims.play('right', true);
//         } else if(this.keyboard.A.isDown === true){
//             this.hero.x = this.hero.x - 64 * (delta / 1000);
//             this.hero.anims.play('left', true);
//         }

//         if(this.keyboard.W.isDown === true){
//             this.hero.y = this.hero.y - 64 * (delta / 1000);
//             this.hero.anims.play('up', true);
//         } else if(this.keyboard.S.isDown === true){
//             this.hero.y = this.hero.y + 64 * (delta / 1000);
//             this.hero.anims.play('down', true);
//         }
//     }
// }


