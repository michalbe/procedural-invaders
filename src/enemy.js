import { material } from './globals';
import { Box } from 'cervus/shapes';
import { Entity } from 'cervus/core/';
import { integer } from 'cervus/core/random';
import { Render, Transform } from 'cervus/components';

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
			this.shape[y] = this.shape[y].concat(this.shape[y].slice().reverse().splice(1));
		}

		console.log(this.shape);
	}
}

export class Enemy {
	constructor(options = {}) {
		this.shape = options.shape;

		this.transform = new Transform();
		this.group = new Entity({
			components: [
				this.transform
			]
		});

		this.shape.forEach((row, y) => {
			row.forEach((el, x) => {
				if (el === 0) {
					return;
				}

				const box = new Box();
				box.get_component(Transform).position = [ x, y, 0 ];
				box.get_component(Render).material = material;
				box.get_component(Render).color = '0F0';
				this.group.add(box);
			});
		});
	}

	set scale(scale) {
		this._scale = scale;
		this.transform.scale = [
			scale,
			scale,
			scale
		]
	}
}
