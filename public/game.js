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
        const startButton = this.add.image(400, 450, 'startButton').setInteractive().setScale(0.6);
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


class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
        this.music = null;
    }

    preload() {
        this.load.image('retryButton', 'assets/retryButton.png');
        this.load.image('gameOverBackground', 'assets/gameOverBackground.png');
        this.load.audio('gameOverMusic', 'assets/gameOverMusic.m4a');
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
        const scoreText = this.add.text(400, 280, `Game Score: ${this.registry.get('score')}`, { fontSize: '32px', fill: '#00FF00' }).setOrigin(0.5);

        // Add retry button
        const retryButton = this.add.image(400, 400, 'retryButton').setInteractive().setScale(0.6);
        retryButton.on('pointerdown', () => {
            if (this.music) {
                this.music.stop(); // Stop the music when retrying
            }
            this.scene.start('StartScene'); // Start the StartScene
        });

        // Add the music
        this.music = this.sound.add('gameOverMusic', { volume: 0.5, loop: true });
        this.music.play();
    }
}



class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });

        this.spaceship = null;
        this.cursors = null;
        this.asteroids = null;
        this.rockets = null;
        this.spacebar = null;
        this.score = 0;
        this.scoreText = null;
        this.lives = 3;
        this.livesText = null;
        this.music = null;
        this.asteroidTimer = 0;
        this.explosionSound = null;
    }

    preload() {
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.audio('backgroundMusic', 'assets/SpaceTripByErik.m4a');
        this.load.image('background', 'assets/background.png');
        this.load.audio('explosionSound', 'assets/explosionSound.ogg'); // Load the explosion sound file
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
        this.spaceship = this.physics.add.sprite(400, 300, 'spaceship').setScale(0.3);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rockets = this.physics.add.group();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.asteroids = this.physics.add.group({
            key: 'asteroid',
            repeat: 5,
            setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 600), stepX: 70 }
        });
        this.asteroids.children.iterate((asteroid) => {
            asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            asteroid.setScale(0.3);
        });
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.music = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
        this.music.play();

        // Initialize the explosion sound
        this.explosionSound = this.sound.add('explosionSound');

        this.physics.add.collider(this.spaceship, this.asteroids, this.hitAsteroid, null, this);
        this.physics.add.collider(this.rockets, this.asteroids, this.destroyAsteroid, null, this);

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
        this.livesText = this.add.text(16, 56, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });
    }

    hitAsteroid = (spaceship, asteroid) => {
        this.lives--;
        this.livesText.setText('Lives: ' + this.lives);

        // Reset spaceship's position after a collision
        this.spaceship.x = 400;
        this.spaceship.y = 300;
        this.spaceship.setVelocity(0,0);  // reset the spaceship's velocity

        asteroid.destroy(); // destroy the asteroid

        this.explosionSound.play();

        if (this.lives <= 0) {
            this.music.stop();
            this.registry.set('score', this.score); // Save the score to registry
            this.scene.start('GameOverScene');
        }
    }


    destroyAsteroid(rocket, asteroid) {
        rocket.destroy();
        asteroid.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    shootRocket(delta) {
        let rocket = this.rockets.create(this.spaceship.x, this.spaceship.y, 'rocket').setScale(0.3);
        rocket.setVelocityY(-200);
        this.asteroidTimer += delta;
        if (this.asteroidTimer > 1000) {
            let asteroid = this.asteroids.create(Phaser.Math.Between(0, 800), 0, 'asteroid').setScale(0.3);
            asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(50, 100));
            this.asteroidTimer = 0;
        }
    }

    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.spaceship.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.spaceship.setVelocityX(200);
        } else {
            this.spaceship.setVelocityX(0);
        }
        if (this.cursors.up.isDown) {
            this.spaceship.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.spaceship.setVelocityY(200);
        } else {
            this.spaceship.setVelocityY(0);
        }

        this.bg.tilePositionY -= 2;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootRocket(delta);
        }
    }
}

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
