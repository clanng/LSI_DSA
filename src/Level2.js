import Phaser from 'phaser';

class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        this.add.text(400, 300, 'Level 2', { fontSize: '64px', fill: '#FFF', align: 'center' }).setOrigin(0.5);
    }
}

export default Level2;
