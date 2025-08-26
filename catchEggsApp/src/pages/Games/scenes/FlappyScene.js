import Phaser from 'phaser';

export default class FlappyScene extends Phaser.Scene {
    constructor() {
        super('FlappyScene');
        this.score = 0;
        this.pipeSpeed = -150; // скорость труб
        this.pipeGap = 200;    // вертикальный зазор между трубами
        this.pipeSpacing = 250; // минимальное горизонтальное расстояние между новыми парами труб
    }

    preload() {
        this.load.image('bg', '/flappyAssets/bg.jpg');
        this.load.image('bird', '/flappyAssets/bird.png');
        this.load.image('pipe', '/flappyAssets/pipe.png');
    }

    create() {
        // фон
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg')
            .setDisplaySize(window.innerWidth, window.innerHeight);

        // птичка
        this.bird = this.physics.add.sprite(100, window.innerHeight / 2, 'bird')
            .setScale(0.2)
            .setOrigin(0.5);

        this.bird.setCollideWorldBounds(true);
        this.bird.body.setSize(this.bird.width * 0.8, this.bird.height * 0.8, true);

        // трубы
        this.pipes = this.physics.add.group();

        // счёт
        this.scoreText = this.add.text(20, 20, 'Счёт: 0', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Montserrat'
        });

        // таймер труб
        this.pipeTimer = this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: this.addPipes,
            callbackScope: this
        });

        // тап
        this.input.on('pointerdown', this.flap, this);

        // коллизии
        this.physics.add.collider(this.bird, this.pipes, this.hitPipe, null, this);
    }

    update() {
        this.pipes.children.each(pipe => {
            if (!pipe.active) return;
            if (pipe.x < -50) {
                pipe.destroy();
                this.score += 0.5;
                this.scoreText.setText('Счёт: ' + Math.floor(this.score));
            }
        });

        if (this.bird.y > window.innerHeight || this.bird.y < 0) {
            this.hitPipe();
        }
    }

    flap() {
        this.bird.setVelocityY(-250);
    }

    addPipes() {
        // Проверка на минимальное горизонтальное расстояние
        const rightMostPipe = this.pipes.getChildren().reduce((maxX, pipe) => Math.max(maxX, pipe.x), 0);
        if (rightMostPipe > window.innerWidth - this.pipeSpacing) return;

        const gap = this.pipeGap;
        const pipeTexture = this.textures.get('pipe').getSourceImage();
        const pipeHeight = pipeTexture.height;

        const topPadding = 50;    // отступ сверху
        const bottomPadding = 50; // отступ снизу

        // Верхняя труба Y (учитываем setOrigin(0,1), чтобы труба не уходила за верх)
        const minTopY = topPadding;
        const maxTopY = window.innerHeight - bottomPadding - gap;

        const topPipeY = Phaser.Math.Between(minTopY, maxTopY);

        // Верхняя труба
        const topPipe = this.pipes.create(window.innerWidth + 50, topPipeY, 'pipe')
            .setOrigin(0, 1)
            .setFlipY(true)
            .setScale(0.5, 1);  // Сужаем ширину в 2 раза, высота без изменений
        topPipe.body.velocity.x = this.pipeSpeed;
        topPipe.body.allowGravity = false;
        topPipe.body.immovable = true;
        topPipe.body.setSize(topPipe.width * 0.9, topPipe.height, true);  // Хитбокс чуть уже новой ширины

        // Нижняя труба
        const bottomPipe = this.pipes.create(window.innerWidth + 50, topPipeY + gap, 'pipe')
            .setOrigin(0, 0)
            .setScale(0.5, 1);  // Аналогично сужаем ширину
        bottomPipe.body.velocity.x = this.pipeSpeed;
        bottomPipe.body.allowGravity = false;
        bottomPipe.body.immovable = true;
        bottomPipe.body.setSize(bottomPipe.width * 0.9, bottomPipe.height, true);  // Хитбокс чуть уже
    }

    hitPipe() {
        this.scene.restart();
        this.score = 0;
    }
}