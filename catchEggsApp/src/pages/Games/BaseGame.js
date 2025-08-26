import Phaser from 'phaser'
import * as phaser from "phaser";

export default class BaseGame {
    constructor(containerRef, sceneConfig) {
        this.container = containerRef;
        this.sceneConfig = sceneConfig;
        this.game = null;
    }

    start() {
        const config = {
            type: Phaser.AUTO,
            width: innerWidth,
            height: innerHeight,
            parent: this.container.value,
            physics: {
                default: 'arcade',
                arcade: { gravity: { y: 600 }, debug: false },
            },
            scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
            scene: this.sceneConfig
        };

        this.game = new Phaser.Game(config);

        window.addEventListener('resize', () => {
            if (this.game) this.game.scale.resize(window.innerWidth, window.innerHeight);
        });
    }

    destroy() {
        if (this.game) {
            this.game.destroy(true);
            this.game = null;
        }
    }
}