class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }
    preload() {
        this.load.image('startButton', 'assets/startButton.png'); // Replace with your own image
        this.load.image('startImage', 'assets/startImage.png'); // Load the background image
        this.load.audio('startMusic', 'assets/startMusic.m4a'); // Load the background music
    }

    create() {
        this.add.image(400, 300, 'startImage'); // Add the background image

        // Add start button and scale it to 30%
        const startButton = this.add.image(400, 480, 'startButton').setInteractive().setScale(0.5);
        startButton.on('pointerdown', () => {
            this.sound.stopAll(); // Stop all sound before transitioning to the GameScene
            this.scene.start('GameScene');
        });

        // Add scrolling text
        const productionText = this.add.text(-200, 550, 'a Lanng Space Industries production', { fontSize: '32px', fill: '#FFF' });
        this.tweens.add({
            targets: productionText,
            x: 1000,
            duration: 5000,
            ease: 'Power1',
            repeat: -1, // -1 means repeat forever
            yoyo: true,
            delay: 1000
        });

        // Add and play the background music
        this.sound.add('startMusic', { loop: true, volume: 0.5 }).play();
    }
}

export default StartScene;