import { Enemy, EnemyShape } from './enemy';
import { Player} from './player';
import { game, enemies_zone } from './globals';
import { integer, seed } from 'cervus/core/random';

const step = 0.1;

export class Level {
	constructor(options = {}) {
		this.enemies = [];

		this.shapes = [];

		this.enemy_scale = options.enemy_scale || 0.2;
		this.enemy_color = options.enemy_color;

		this.player_scale = options.player_scale || this.enemy_scale;
		this.player_color = options.player_color || this.enemy_color;

		this.rows = options.rows || 4;
		this.cols = options.cols || 10;
		this.dir = options.dir || 1;

		this.margin = this.margin || (this.enemy_scale * 3);
		this.delay = options.delay || 16;

		this.setup_shapes();
		this.setup_enemies();
		this.spawn_player();
	}

	setup_shapes() {
		const shapes = integer(1, 4);
		for (let i = 0; i< shapes; i++) {
			this.shapes.push(new EnemyShape());
		}
	}

	setup_enemies() {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				this.create_enemy(x, y);
			}
		}
	}

	create_enemy(x, y) {
		const enemy = new Enemy({
			shape: this.shapes[y%this.shapes.length].shape,
			color: this.enemy_color
		});

		enemy.scale = this.enemy_scale;
		enemy.position = {
			x: x - (enemies_zone.x * this.dir) - (enemies_zone.x/2) + (this.margin * x),
			y: enemies_zone.y - y - (this.margin * y)
		};

		game.add(enemy.group);

		this.enemies.push(enemy);
	}

	spawn_player() {
		this.player = new Player({
			color: this.player_color
		});

		this.player.scale = this.enemy_scale;
		this.player.position = {
			x: 0,
			y: -0.45
		};

		game.add(this.player.group);
	}

	do_step() {
		this.enemies.forEach(enemy => {
			enemy.position = {
				x: enemy.position.x + (step * this.dir),
				y: enemy.position.y
			}
		});

		const hit_limit = this.enemies.some(enemy => {
			return (this.dir === 1 && enemy.position.x > enemies_zone.x)
				|| (this.dir === -1 && enemy.position.x < -enemies_zone.x);
		})

		if (hit_limit) {
			this.dir *= -1;
			this.enemies.forEach(enemy => {
				enemy.position = {
					x: enemy.position.x,
					y: enemy.position.y - 1
				}
			});
		}
	}
}
