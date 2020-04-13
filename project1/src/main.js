import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {IntroScene} from "./scenes/IntroScene.js";
import {CharacterScene} from "./scenes/CharacterScene.js";
import {World1Scene} from "./scenes/World1Scene.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [LoadScene, MenuScene, IntroScene, CharacterScene, World1Scene],
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);