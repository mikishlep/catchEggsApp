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
        this.score = 0;
        this._uiShown = false;

        // фон
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg')
            .setDisplaySize(window.innerWidth, window.innerHeight);

        // птичка
        this.bird = this.physics.add.sprite(100, window.innerHeight / 2, 'bird')
            .setScale(0.2)
            .setOrigin(0.5);

        this.bird.setCollideWorldBounds(true);
        this.bird.body.setSize(this.bird.width * 0.7, this.bird.height * 0.7, true);

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

        if (this.game?.events) {
            this.game.events.emit('scoreUpdate', Math.floor(this.score));
        }

        if (this.bird.y > window.innerHeight || this.bird.y < 0) {
            this.hitPipe();
        }
    }

    flap() {
        this.bird.setVelocityY(-350);
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
        topPipe.body.setSize(topPipe.width * 0.7, topPipe.height, true);  // Хитбокс чуть уже новой ширины

        // Нижняя труба
        const bottomPipe = this.pipes.create(window.innerWidth + 50, topPipeY + gap, 'pipe')
            .setOrigin(0, 0)
            .setScale(0.5, 1);  // Аналогично сужаем ширину
        bottomPipe.body.velocity.x = this.pipeSpeed;
        bottomPipe.body.allowGravity = false;
        bottomPipe.body.immovable = true;
        bottomPipe.body.setSize(bottomPipe.width * 0.7, bottomPipe.height, true);  // Хитбокс чуть уже
    }

    hitPipe() {
        if (this._uiShown) return;
        this._uiShown = true;

        // стопим физику и таймер
        this.physics.pause();
        if (this.pipeTimer) this.pipeTimer.remove();

        // лёгкий фидбек
        this.bird.setTint(0xff4d4f);

        this.showGameOverUI();
    }

    showGameOverUI() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        // читаем тему из CSS
        const css = getComputedStyle(document.documentElement);
        const mainHex = (css.getPropertyValue('--main-color') || '#2F80ED').trim();
        const mainColor = Phaser.Display.Color.HexStringToColor(mainHex).color;

        // затемняем фон
        const dim = this.add.rectangle(cx, cy, width, height, 0x000000, 0.45).setDepth(900);

        // контейнер UI по центру
        const ui = this.add.container(cx, cy).setDepth(1000);

        // размеры карточки
        const cardW = Math.min(360, width - 40);
        const cardH = 230;
        const radius = 16;

        // тень (мягкая)
        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.08);
        shadow.fillRoundedRect(-cardW/2 + 6, -cardH/2 + 10, cardW, cardH, radius);
        ui.add(shadow);

        // сама карточка
        const card = this.add.graphics();
        card.fillStyle(0xffffff, 1);
        card.lineStyle(1, 0xE5E7EB, 1); // #e5e7eb ~ серый бордер
        card.fillRoundedRect(-cardW/2, -cardH/2, cardW, cardH, radius);
        card.strokeRoundedRect(-cardW/2, -cardH/2, cardW, cardH, radius);
        ui.add(card);

        // заголовок
        const title = this.add.text(0, -cardH/2 + 28, 'Вы проиграли', {
            fontFamily: 'Montserrat',
            fontSize: '24px',
            fontStyle: '700',
            color: '#111827' // slate-900
        }).setOrigin(0.5, 0.5);
        ui.add(title);

        // подзаголовок
        const subtitle = this.add.text(0, -cardH/2 + 64, `Ваш счёт: ${Math.floor(this.score)}`, {
            fontFamily: 'Montserrat',
            fontSize: '18px',
            color: '#6B7280' // slate-500
        }).setOrigin(0.5, 0.5);
        ui.add(subtitle);

        // helper: кнопка (rounded, цвета темы, интерактив)
        const makeButton = (y, bgColor, label, onClick, invertedText = false) => {
            const btnW = cardW - 40;
            const btnH = 48;
            const btnRadius = 12;

            const btn = this.add.container(0, y);

            const g = this.add.graphics();
            g.fillStyle(bgColor, 1);
            g.fillRoundedRect(-btnW/2, -btnH/2, btnW, btnH, btnRadius);
            btn.add(g);

            const text = this.add.text(0, 0, label, {
                fontFamily: 'Montserrat',
                fontSize: '18px',
                fontStyle: '600',
                color: invertedText ? '#111827' : '#ffffff'
            }).setOrigin(0.5);
            btn.add(text);

            // зона для клика
            const hit = this.add.zone(0, 0, btnW, btnH)
                .setInteractive({ useHandCursor: true });
            btn.add(hit);

            // лёгкие эффекты нажатия
            hit.on('pointerdown', () => {
                btn.setScale(0.98);
            });
            hit.on('pointerup', () => {
                btn.setScale(1);
                onClick();
            });
            hit.on('pointerout', () => btn.setScale(1));

            return btn;
        };

        // кнопка "Заново" — в цвете темы
        const retryBtn = makeButton(10, mainColor, 'Заново', () => {
            // очистка UI
            dim.destroy();
            ui.destroy();
            // рестарт
            this.scene.restart();
            this._uiShown = false;
        });
        ui.add(retryBtn);

        // кнопка "Главная" — светло-серая как у иконок (#dedede)
        const homeBtn = makeButton(75, 0xDEDEDE, 'Главная', () => {
            // вариант 1: событие наружу (удобно перехватить во Vue)
            this.game.events.emit('goHomeFromGame');

            // вариант 2 (если ничего не слушает): просто назад
            if (window && window.history && window.history.length > 1) {
                window.history.back();
            }
        }, true);
        ui.add(homeBtn);
    }
}