import { integer } from 'cervus/core/random';
import { Thing } from './thing';
import { physics_world } from './globals';
import { RigidBody } from 'cervus/components';

export class EnemyShape {
	constructor() {
		this.width = 3;
		this.height = 5;
		this.shape = [];
		this.second_shape = [];

		this.size = {
			y: this.height,
			x: (this.width * 2) -1
		};

		for (let y = 0; y < this.height; y++) {
			this.shape[y] = [];
			this.second_shape[y] = [];

			for (let x = 0; x < this.width; x++) {
				this.shape[y][x] = this.second_shape[y][x] = integer(0, 1);
			}

			this.shape[y] = this.mirror(this.shape[y]);
		}

		// This is poor man's animation
		this.second_shape = this.create_second_shape(this.second_shape);
	}

	create_second_shape(shape) {
		const i = integer(0, shape.length-1);
		shape[i] = shape[i].map(() => integer(0, 1));

		return shape.map(this.mirror);
	}

	mirror(array) {
		return array.concat(array.slice().reverse().splice(1));
	}
}

export class Enemy extends Thing {
	constructor(options) {
		super(options);

		this.count = 0;

		this.frames_count = 2;
		this.active_frame = 1;
		this.frames = [
			this.build_from_shape(options.shape.shape),
			this.build_from_shape(options.shape.second_shape),
		];

		this.group.add(this.frames[this.active_frame]);
	}

	change_frames() {
		this.group.entities.delete(this.frames[this.active_frame]);
		this.count++;
		this.active_frame = this.count%this.frames_count;
		this.group.add(this.frames[this.active_frame]);
	}

	kill() {
		this.change_color('#00FF00');
		this.elements.forEach(element => {
			element.add_component(new RigidBody({
				world: physics_world,
				shape: 'box',
				mass: 10
			}));
		});
	}
}
