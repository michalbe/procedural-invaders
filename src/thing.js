import { Render, Transform } from 'cervus/components';
import { material } from './globals';
import { Box } from 'cervus/shapes';
import { Entity } from 'cervus/core/';
import { enemies_zone, lighter_color } from './globals';

export class Thing {
	constructor(options = {}) {
		this.shape = options.shape;
		this.elements = [];

		this.color = options.color || 'FFFF00';

		this.transform = new Transform();
		this.group = new Entity({
			components: [
				this.transform
			]
		});

	}

	build_from_shape(shape, starting_row = 0) {
		const group = new Entity({
			components: [
				new Transform()
			]
		});

		shape.forEach((row, y) => {
			row.forEach((el, x) => {
				if (el === 0) {
					return;
				}

				const box = new Box();
				this.elements.push(box);
				box.render_component = box.get_component(Render);
				box.transform_component = box.get_component(Transform);
				box.transform_component.position = [ x, y, 0 ];
				box.render_component.material = material;
				box.render_component.color = lighter_color(this.color, starting_row * 10);
				group.add(box);
			});
		});

		return group;
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
		this.transform.position = [
			x - enemies_zone.x,
			y,
			0
		];
	}

	get position() {
		return {
			x: this.transform.position[0] + enemies_zone.x,
			y: this.transform.position[1]
		}
	}

	change_color(color) {
		this.elements.forEach((el) => {
			el.render_component.color = color;
		});
	}
}
