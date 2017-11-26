import { Thing } from './thing';
import { Transform, Render } from 'cervus/components';
import { Box } from 'cervus/shapes';
import { material } from './globals';

export class Bullet extends Thing {
	constructor(options = {}) {
		super(options);

		this.speed = 0.2;

		const box = new Box();
		// this.elements.push(box);
		this.transform = box.get_component(Transform);
		this.transform.position = [ -10, -10, 0 ];
		box.get_component(Render).material = material;
		box.get_component(Render).color = options.color || '#FF0000';

		this.group = box;

		// this.group.add(box);
		this.scale = 0.2;
	}
}
