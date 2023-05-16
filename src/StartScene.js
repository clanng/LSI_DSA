import Phaser from 'phaser';
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }
    preload() {
        this.load.image('startButton', 'assets/startButton.png'); // Replace with your own image
        this.load.image('startImage', 'assets/startImage.png'); // Load the background image
        this.load.audio('startMusic', 'assets/startMusic.mp3'); // Load the background music
    }

    create() {
        this.add.image(400, 300, 'startImage'); // Add the background image

        // Add the title text in the upper middle of the canvas, now in bright neon green
        this.add.text(400, 100, 'Deep Space Adventure', { fontSize: '48px', fill: '#39FF14', align: 'center' }).setOrigin(0.5);

        // Add an input field for the player's name
        let element = this.add.dom(400, 360, 'input', {
            type: 'text',
            name: 'nameField',
            fontSize: '48px',
            backgroundColor: '#000'
        });

        // Add start button and scale it to 30%
        const startButton = this.add.image(400, 480, 'startButton').setInteractive().setScale(0.5);
        startButton.on('pointerdown', () => {
            this.sound.stopAll(); // Stop all sound before transitioning to the GameScene
            let playerName = element.node.value; // Store player name
            this.registry.set('playerName', playerName); // Save player name in registry to access it later
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
