import { Render, Transform } from 'cervus/components';
import { material } from './globals';
import { Box } from 'cervus/shapes';
import { Entity } from 'cervus/core/';

export class Thing {
	constructor(options = {}) {
		this.shape = options.shape;
		this.elements = [];

		this.color = options.color || '#FFFF00';

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
				this.elements.push(box);
				box.get_component(Transform).position = [ x, y, 0 ];
				box.get_component(Render).material = material;
				box.get_component(Render).color = this.color;
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

	set position({x, y}) {
		this.transform.position = [x, y, 0];
	}

	get position() {
		return {
			x: this.transform.position[0],
			y: this.transform.position[1]
		}
	}
}
