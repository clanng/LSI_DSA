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

    // Random speed for each asteroid
    asteroids.children.iterate((asteroid) => {
        asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        asteroid.setScale(0.3); // Scale down the asteroid size
    });

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    music = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
    music.play();

    this.physics.add.collider(spaceship, asteroids, hitAsteroid, null, this);
    this.physics.add.collider(rockets, asteroids, destroyAsteroid, null, this);

    function hitAsteroid(spaceship, asteroid) {
        // to be implemented
    }

    function destroyAsteroid(rocket, asteroid) {
        rocket.destroy();
        asteroid.destroy();
    }

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(16, 56, 'Lives: 3', { fontSize: '32px', fill: '#000' });
}

function destroyAsteroid(rocket, asteroid) {
    // ...

    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitAsteroid(spaceship, asteroid) {
    lives--;
    livesText.setText('Lives: ' + lives);

    if (lives <= 0) {
        this.physics.pause();
        spaceship.setTint(0xff0000);
    }
}

function update() {
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
    shootRocket(this);
  function shootRocket(game) {
  let rocket = rockets.create(spaceship.x, spaceship.y, 'rocket').setScale(0.3);
  rocket.setVelocityY(-200);

}}}

