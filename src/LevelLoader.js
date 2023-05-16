import Phaser from 'phaser';

class LevelLoader extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelLoader' });
    }

    init(data) {
        this.score = data.score;
    }

    preload() {
        this.load.image('warpSpeed', 'assets/warpSpeed.png'); // Load the warp speed image
    }

    create() {
        // Remove all asteroids
        this.asteroids.clear(true, true);

        // Make the spaceship glow white
        this.spaceship.setTint(0xffffff);

        // Change the background scroller tile and speed
        this.background.setTexture('warpSpeed');
        this.background.tilePositionY -= 10;

        // Display level completion text
        this.add.text(400, 300, 'Level 1 Complete!', { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5);

        // Display countdown text
        this.countdownText = this.add.text(400, 350, '', { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5);

        // Start countdown
        this.time.delayedCall(1000, this.updateCountdown, [], this);
    }

    updateCountdown() {
        this.countdown -= 1;
        this.countdownText.setText(`Warp Speed, arriving in ${this.countdown} seconds`);

        if (this.countdown > 0) {
            this.time.delayedCall(1000, this.updateCountdown, [], this);
        } else {
            this.scene.start('Level2', { score: this.score });
        }
    }
}

export default LevelLoader;
