import { Thing } from './thing';
import { Transform, Render } from 'cervus/components';
import { Box } from 'cervus/shapes';
import { material } from './globals';

export class Bullet extends Thing {
	constructor(options = {}) {
		super(options);

		this.speed = 0.1;
		
		const box = new Box();
		this.elements.push(box);
		box.get_component(Transform).position = [ -10, -10, 0 ];
		box.get_component(Render).material = material;
		box.get_component(Render).color = '#FF0000';
		this.group.add(box);
		this.scale = 0.2;
	}
}
