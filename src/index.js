import Phaser from 'phaser';
import StartScene from './startscene.js';
import GameScene from './gamescene.js';
import GameOverScene from './gameoverscene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: [StartScene, GameScene, GameOverScene],
};

const game = new Phaser.Game(config);
