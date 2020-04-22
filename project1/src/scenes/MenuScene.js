import {CST} from "../CST.js";

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
    }
    preload(){

    }
    create(){

        let topBackground = this.add.graphics({
            fillStyle: {
                color: 0x0a89ff
            }
        })

        let bottomBackground = this.add.graphics({
            fillStyle: {
                color: 0x005280
            }
        })

       
        topBackground.fillRect(0, 0, 800, 700)
        bottomBackground.fillRect(0, 700, 800, 200)
        // this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 150, CST.IMAGE.TITLE_BG);

        
        this.bg1 = this.add.tileSprite(0, this.game.config.height - 195, this.game.config.width, 208, CST.IMAGE.CLOUDS_BG).setOrigin(0,0);
        this.bg4 = this.add.tileSprite(0, this.game.config.height - 225, this.game.config.width, 208, CST.IMAGE.CLOUDS_BG).setOrigin(0,0);
        this.bg4.setAlpha(0.5);
        this.bg4.setScale(1.5);
        this.bg2 = this.add.tileSprite(0, this.game.config.height - 195, this.game.config.width, 208, CST.IMAGE.MOUNT_BG).setOrigin(0,0);
        this.bg3 = this.add.tileSprite(0, this.game.config.height - 195, this.game.config.width, 208, CST.IMAGE.TREES_BG).setOrigin(0,0);

        this.bird = this.add.sprite(-50, 290, CST.SPRITE.ROBIN);
        
        this.anims.create({
            key: 'fly',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.ROBIN)
        })


        this.bird.anims.play('fly');


        this.add.image(this.game.renderer.width / 2, 50, CST.IMAGE.TITLE);
        let newButton = this.add.image(this.game.renderer.width / 2 - 100, 125, CST.IMAGE.NEW).setInteractive();
        let resumeButton = this.add.image(this.game.renderer.width / 2 + 100, 125, CST.IMAGE.RESUME).setInteractive();
        let optionsButton = this.add.image(this.game.renderer.width / 2, 150, CST.IMAGE.OPTIONS).setInteractive();
        newButton.name = "new";
        resumeButton.name = "resume";
        optionsButton.name = "options";
        this.sound.play(CST.AUDIO.TITLE_MUSIC, {
            loop: true
        })

        newButton.on('pointerover', ()=>{
          newButton.scale = 1.1;
        })
            
        newButton.on('pointerout', ()=>{
            newButton.scale = 1.0;
        })
            
        newButton.on('pointerup', () => {
            this.sound.stopAll();
            this.scene.start(CST.SCENES.WORLD1);
        })
    }

    moveBird(){
        this.bird.x += 0.2;
        if(this.bird.x > this.game.config.width + 50){
            this.resetBird();
        }
        
    }

    resetBird(){
        this.bird.x = -50;
    }

    update(time, delta){
        this.bg1.tilePositionX = 4 * (time / 1000);
        this.bg4.tilePositionX = 2 * (time /1000 )
        this.bg2.tilePositionX = 7 * (time / 1000);
        this.bg3.tilePositionX = 30 * (time / 1000);
        this.moveBird();

    }
    

}