import { Thing } from './thing';
import { Move, RigidBody } from 'cervus/components';
import { wire_material, material, game, physics_world } from './globals';

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

		this.lifes = 3;

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

	is_colliding_with_bullets(bullets) {
		let radius = 0.6;

		// const player_position = {
		// 	x: this.position.x - 0.4,
		// 	y: this.position.y - 0.4
		// };
// this.position

		return bullets.some((bullet) => {
			window.bullet = bullet;
			// console.log(bullet.position, this.position);
			const bullet_position = bullet.position;
			if (
				Math.sqrt(
					Math.pow(this.position.x - bullet_position.x + 0.4, 2) +
					Math.pow(this.position.y - bullet_position.y + 0.4, 2)
				) < radius
			) {
				return true;
			}
			return false;
		});
	}

	hit() {
		if (this.is_hit) {
			return;
		}

		this.lifes--;
		if (this.lifes === 0) {
			this.destroy();
			return;
		}

		this.is_hit = true;
		this.elements.forEach(element => {
			element.render_component.material = wire_material;
		});

		setTimeout(() => {
			this.elements.forEach(element => {
				element.render_component.material = material;
			});
			setTimeout(() => {
				this.elements.forEach(element => {
					element.render_component.material = wire_material;
				});
				setTimeout(() => {
					this.elements.forEach(element => {
						element.render_component.material = material;
					});

					this.is_hit = false;
				}, 100);
			}, 100);
		}, 100);
	}

	destroy() {
		this.elements = [];
		Array.from(this.frame.entities).forEach(element => {
			element.render_component.material = wire_material;
			element.parent = null;
			element.transform_component.scale = this.transform.scale;
			element.transform_component.position = [
				element.transform_component.position[0] * this._scale + this.transform.position[0],
				element.transform_component.position[1] * this._scale + this.transform.position[1],
				0,
			];
			game.add(element);
			this.elements.push(element);
			element.rigid_body_component = new RigidBody({
				world: physics_world,
				shape: 'box',
				mass: 40
			});
			element.add_component(element.rigid_body_component);
		});

		setTimeout(() => {
			this.remove_rigids_from_world()
		}, 2000);
	}
}
