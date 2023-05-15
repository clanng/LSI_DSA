import Phaser from 'phaser';
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
        this.music = null;
    }

    preload() {
        this.load.image('retryButton', 'assets/retryButton.png');
        this.load.image('gameOverBackground', 'assets/gameOverBackground.png');
        this.load.audio('gameOverMusic', 'assets/gameOverMusic.mp3');
    }

    create() {
        // Add the background image
        this.add.image(400, 300, 'gameOverBackground');

        // Add Game Over scrolling text
        const gameOverText = this.add.text(-200, 200, 'Game Over!', { fontSize: '64px', fill: '#FFF' });
        this.tweens.add({
            targets: gameOverText,
            x: 800,
            duration: 5000,
            ease: 'Power1',
            repeat: -1
        });

        // Show the game score
        let finalScore = this.registry.get('score');
        const scoreText = this.add.text(400, 280, `Game Score: ${finalScore}`,
            { fontSize: '32px', fill: '#00FF00' }).setOrigin(0.5);

        // Add retry button
        const retryButton = this.add.image(400, 400, 'retryButton').setInteractive().setScale(0.6);
        retryButton.on('pointerdown', () => {
            if (this.music) {
                this.music.stop(); // Stop the music when retrying
            }

            this.registry.destroy(); // destroy game registry
            this.events.off(); // turn off all active events

            this.scene.start('StartScene'); // Start the StartScene
        });


        // Add the music
        this.music = this.sound.add('gameOverMusic', { volume: 0.5, loop: true });
        this.music.play();
    }
}

export default GameOverScene;