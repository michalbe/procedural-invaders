import { Thing } from './thing';
import { Move } from 'cervus/components';

export class Player extends Thing {
	constructor(options = {}) {
		// Da faq is this upside down? Nvm, it's 3am...
		options.shape = [
			[0, 1, 1, 0, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 1, 1, 0, 1],
			[0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0]
		];

		super(options);

		this.color = 'CCCCCC';
		this.frame = this.build_from_shape(this.shape);
		this.group.add(this.frame);

		this.move = new Move();
		this.move.keyboard_controlled = true;
		this.move.rotate_speed = 0;
		this.move.move_speed = 5;
		delete this.move.dir_desc['69'];
		delete this.move.dir_desc['81'];
		delete this.move.dir_desc['87'];
		delete this.move.dir_desc['83'];
		this.group.add_component(this.move);
	}
}
