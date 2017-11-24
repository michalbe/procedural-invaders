import { Box } from 'cervus/shapes';
import { integer } from 'cervus/core/random';


export class EnemyShape {
	constructor() {
		this.width = 3;
		this.height = 5;
		this.shape = [];

		for (let y = 0; y < this.height; y++) {
			this.shape[y] = [];
			for (let x = 0; x < this.width; x++) {
				this.shape[y][x] = integer(0, 1);
			}
		}

	}
}

export class Enemy {
	constructor(options = {}) {
		this.shape = options.shape;
		console.log(this.shape);
	}
}
