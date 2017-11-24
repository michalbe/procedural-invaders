import { integer } from 'cervus/core/random';
import { Thing } from './thing';

export class EnemyShape {
	constructor() {
		this.width = 3;
		this.height = 5;
		this.shape = [];

		this.size = {
			y: this.height,
			x: (this.width * 2) -1
		};

		for (let y = 0; y < this.height; y++) {
			this.shape[y] = [];
			for (let x = 0; x < this.width; x++) {
				this.shape[y][x] = integer(0, 1);
			}
			this.shape[y] = this.shape[y].concat(this.shape[y].slice().reverse().splice(1));
		}
	}
}

export class Enemy extends Thing {}
