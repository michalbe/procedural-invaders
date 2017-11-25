import { Thing } from './thing';
import { Move } from 'cervus/components';

export class Player extends Thing {
	constructor(options = {}) {
		// Da faq is this upside down? Nvm, it's 3am...
		options.shape = [
			[0, 1, 1, 0, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 0, 0],
			[0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0]
		];

		super(options);

		this.move = new Move();
		this.move.keyboard_controlled = true;
		this.group.add_component(this.move);
	}
}
