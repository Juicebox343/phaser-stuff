import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {World1Scene} from "./scenes/World1Scene.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [LoadScene, MenuScene, World1Scene],
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);

