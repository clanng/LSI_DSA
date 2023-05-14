function preload() {
    this.load.image('spaceship', 'assets/spaceship.png');
    this.load.image('asteroid', 'assets/asteroid.png');
    this.load.image('rocket', 'assets/rocket.png');
    this.load.audio('backgroundMusic', 'assets/SpaceTripByErik.m4a');
    this.load.image('background', 'assets/background.png');
}

let spaceship;
let cursors;
let asteroids;
let rockets;
let spacebar;
let score = 0;
let scoreText;
let lives = 3;
let livesText;
let music;
let asteroidTimer = 0;

function create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
    spaceship = this.physics.add.sprite(400, 300, 'spaceship').setScale(0.3);
    cursors = this.input.keyboard.createCursorKeys();
    rockets = this.physics.add.group();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    asteroids = this.physics.add.group({
        key: 'asteroid',
        repeat: 5,
        setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 600), stepX: 70 }
    });
    asteroids.children.iterate((asteroid) => {
        asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        asteroid.setScale(0.3);
    });
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    music = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
    music.play();

    this.physics.add.collider(spaceship, asteroids, hitAsteroid.bind(this), null, this);
    this.physics.add.collider(rockets, asteroids, destroyAsteroid.bind(this), null, this);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    livesText = this.add.text(16, 56, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });
}

function hitAsteroid(spaceship, asteroid) {
    lives--;
    livesText.setText('Lives: ' + lives);

    // Reset spaceship's position after a collision
    spaceship.x = 400;
    spaceship.y = 300;
    spaceship.setVelocity(0,0);  // reset the spaceship's velocity

    asteroid.destroy(); // destroy the asteroid

    if (lives <= 0) {
        this.physics.pause();
        spaceship.setTint(0xff0000);
    } else {
        spaceship.clearTint(); // clear the tint if spaceship still has lives
    }
}


function destroyAsteroid(rocket, asteroid) {
    rocket.destroy();
    asteroid.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}

function shootRocket(game, delta) {
    let rocket = rockets.create(spaceship.x, spaceship.y, 'rocket').setScale(0.3);
    rocket.setVelocityY(-200);
    asteroidTimer += delta;
    if (asteroidTimer > 1000) {
        let asteroid = asteroids.create(Phaser.Math.Between(0, 800), 0, 'asteroid').setScale(0.3);
        asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(50, 100));
        asteroidTimer = 0;
    }
}

function update(delta) {
    if (cursors.left.isDown) {
        spaceship.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        spaceship.setVelocityX(200);
    } else {
        spaceship.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        spaceship.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        spaceship.setVelocityY(200);
    } else {
        spaceship.setVelocityY(0);
    }

    this.bg.tilePositionY -= 2;

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        shootRocket(this, delta);
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
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);
