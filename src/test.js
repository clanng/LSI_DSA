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
        this.asteroidCount = 5; // Initial asteroid count
        this.largeAsteroid = {speed: 100, frequency: 1, points: 10};
        this.mediumAsteroid = {speed: 125, frequency: 2, points: 20};
        this.smallAsteroid = {speed: 150, frequency: 3, points: 30};
    }

    preload() {
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.audio('backgroundMusic', 'assets/SpaceTripByErik.m4a');
        this.load.image('background', 'assets/background.png');
        this.load.audio('explosionSound', 'assets/explosionSound.ogg'); // Load the explosion sound file
        this.load.audio('shootSound', 'assets/shootSound.ogg');
    }
    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
        this.spaceship = this.physics.add.sprite(400, 300, 'spaceship').setScale(0.3);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rockets = this.physics.add.group();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceship.setCollideWorldBounds(true);
        this.shootSound = this.sound.add('shootSound');


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
            this.scene.start('GameOverScene');
        }
    }


    destroyAsteroid = (rocket, asteroid) => {
        rocket.destroy();
        asteroid.destroy();
        this.score += 10; // Increase score by 10 for each destroyed asteroid
        this.scoreText.setText('Score: ' + this.score);

        // Generate new asteroids if the score is a multiple of 30
        if (this.score % 30 === 0) { // Changed from 100 to 30, for every 30 points or 3 asteroids
            this.asteroidCount++;
            this.generateAsteroids();
        }
    }
    generateAsteroids = () => {
        // Check if the asteroids group exists and clear it
        if (this.asteroids && this.asteroids.children && this.asteroids.children.size > 0) {
            this.asteroids.clear(true, true); // clear the existing asteroids
        }

        this.asteroids = this.physics.add.group({
            key: 'asteroid',
            repeat: this.asteroidCount,
            setXY: { x: Phaser.Math.Between(0, 800), y: 0, stepX: 70 } // start asteroids at the top of the screen
        });

        this.asteroids.children.iterate((asteroid) => {
            asteroid.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(50, 100)); // set x velocity smaller and y velocity always positive
            asteroid.setScale(0.3);
        });

        this.physics.add.collider(this.spaceship, this.asteroids, this.hitAsteroid, null, this);
        this.physics.add.collider(this.rockets, this.asteroids, this.destroyAsteroid, null, this);
    }


    shootRocket(delta) {
        let rocket = this.rockets.create(this.spaceship.x, this.spaceship.y, 'rocket').setScale(0.3);
        rocket.setVelocityY(-200);
        this.shootSound.play();  // Play the shooting sound here

        this.asteroidTimer += delta;
        if (this.asteroidTimer > 1000) {
            let asteroid = this.asteroids.create(Phaser.Math.Between(0, 800), 0, 'asteroid').setScale(0.3);
            asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(50, 100));
            this.asteroidTimer = 0;
        }
    }
