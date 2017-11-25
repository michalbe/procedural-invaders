import { Enemy, EnemyShape } from './enemy';
import { Player} from './player';
import { game, enemies_zone } from './globals';

export class Level {
	constructor(options = {}) {
		this.shapeClass = new EnemyShape();
		this.enemy_size = this.shapeClass.size;
		this.enemy_scale = options.enemy_scale || 0.2;
		this.enemy_color = options.enemy_color;

		this.player_scale = options.player_scale || this.enemy_scale;
		this.player_color = options.player_color || this.enemy_color;

		this.rows = options.row || 10;
		this.cols = options.cols || 4;
		this.dir = options.dir || 1;

		this.margin = this.margin || (this.enemy_scale * 3);

		this.setup_enemies();
		this.spawn_player();
	}

	setup_enemies() {
		for (let y = 0; y < this.cols; y++) {
			for (let x = 0; x < this.rows; x++) {
				this.create_enemy(x, y);
			}
		}
	}

	create_enemy(x, y) {
		const enemy = new Enemy({
			shape: this.shapeClass.shape,
			color: this.enemy_color
		});

		enemy.scale = this.enemy_scale;
		enemy.position = {
			x: x - (enemies_zone.x * this.dir) - (enemies_zone.x/2) + (this.margin * x),
			y: enemies_zone.y - y - (this.margin * y)
		};

		game.add(enemy.group);
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
}
