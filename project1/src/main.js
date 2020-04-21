import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";

let game = new Phaser.Game({
    width: 100,
    height: 100,
    scene: [
        LoadScene, MenuScene
    ]
});