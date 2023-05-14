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
        this.explosionSound = null;

    }

    preload() {
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.audio('backgroundMusic', 'assets/SpaceTripByErik.m4a');
        this.load.image('background', 'assets/background.png');
        this.load.audio('explosionSound', 'assets/explosionSound.ogg'); // Load the explosion sound file
        this.load.audio('shootSound', 'assets/shootSound.ogg');
        this.load.image('largeAsteroid', 'assets/largeAsteroid.png');
        this.load.image('mediumAsteroid', 'assets/mediumAsteroid.png');
        this.load.image('smallAsteroid', 'assets/smallAsteroid.png');
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
        this.spaceship = this.physics.add.sprite(400, 300, 'spaceship').setScale(0.3);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rockets = this.physics.add.group();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceship.setCollideWorldBounds(true);
        this.shootSound = this.sound.add('shootSound');
        this.asteroids = this.physics.add.group();
        this.asteroidCount = 10; // Initial asteroid count

        // Generate initial asteroids
        this.generateAsteroids();

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.music = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
        this.music.play();

        this.explosionSound = this.sound.add('explosionSound');

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

        this.lives = 3;  // Reset lives to 3
        this.livesText = this.add.text(16, 56, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });

        this.asteroidGenerator = this.time.addEvent({
            delay: 3000, // 3000ms = 3s
            callback: this.generateAsteroids,
            callbackScope: this,
            loop: true
        });

        this.input.on('pointermove', (pointer) => {
            this.tweens.add({
                targets: this.spaceship,
                x: Phaser.Math.Clamp(pointer.x, 0, this.sys.game.config.width),
                y: Phaser.Math.Clamp(pointer.y, 0, this.sys.game.config.height),
                duration: 200,
                ease: 'Power1',
            });
        });

        this.input.on('pointermove', (pointer) => {
            this.spaceship.x = Phaser.Math.Clamp(pointer.x, 0, this.sys.game.config.width);
            this.spaceship.y = Phaser.Math.Clamp(pointer.y, 0, this.sys.game.config.height);
        });

        this.input.on('pointerdown', () => {
            this.shootRocket();
        });

    }

    createAsteroid = (type) => {
        let asteroid = this.asteroids.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(-200, 0), type.key);
        asteroid.setVelocity(Phaser.Math.Between(-type.speed, type.speed), Phaser.Math.Between(type.speed, type.speed * 1.5));
        asteroid.setScale(type.scale);
        asteroid.setData('type', type.key);
        asteroid.setData('scoreValue', type.points);

        return asteroid;
    }
    generateAsteroids = () => {
        // Create asteroids of different types and speeds
        const asteroidTypes = [
            { key: 'largeAsteroid', points: 5, speed: 50, scale: 0.6, count: Math.round(this.asteroidCount * 0.2) }, // 20% of total
            { key: 'mediumAsteroid', points: 10, speed: 75, scale: 0.4, count: Math.round(this.asteroidCount * 0.3) }, // 30% of total
            { key: 'smallAsteroid', points: 20, speed: 100, scale: 0.2, count: Math.round(this.asteroidCount * 0.5) } // 50% of total
        ];

        for (let type of asteroidTypes) {
            for (let i = 0; i < type.count; i++) {
                this.createAsteroid(type);
            }
        }

        this.physics.add.collider(this.spaceship, this.asteroids, this.hitAsteroid, null, this);
        this.physics.add.collider(this.rockets, this.asteroids, this.destroyAsteroid, null, this);
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
            this.registry.set('score', this.score); // Save the score to the registry
            this.asteroidGenerator.destroy();
            this.scene.start('GameOverScene');
        }
    }

    destroyAsteroid = (rocket, asteroid) => {
        // Destroy the rocket and the asteroid
        rocket.destroy();
        asteroid.destroy();

        // Play explosion sound
        this.explosionSound.play();

        // Increase score depending on asteroid type
        let scoreValue = asteroid.getData('scoreValue');
        console.log(scoreValue);  // Add this line
        if (scoreValue) {
            this.score += scoreValue;
            this.scoreText.setText('Score: ' + this.score);

            // Increase difficulty for every 100 points scored
            if (this.score % 100 === 0) {
                this.asteroidCount++;
                this.generateAsteroids();
            }
        }
    }


    shootRocket() {
        let rocket = this.rockets.create(this.spaceship.x, this.spaceship.y, 'rocket').setScale(0.3);
        rocket.setVelocityY(-200);
        this.shootSound.play();  // Play the shooting sound here
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
export default GameScene;