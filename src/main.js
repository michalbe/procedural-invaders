import { Plane } from 'cervus/shapes';
import { Render, Transform, RigidBody } from 'cervus/components';
import { game, material, shoot_key, enemies_zone, physics_world } from './globals';
import { set_seed, integer } from 'cervus/core/random';
import { Level } from './level';

set_seed(~~(Math.random()*1000000));

const light = game.light.get_component(Transform);
light.position = [0, 0, -2];
const camera_transform = window.camera = game.camera.get_component(Transform);
camera_transform.position = [0.424, 0.595, -12];
camera_transform.rotation = [-0.112, 0, 0, 0.99];

// game.camera.get_component(Move).keyboard_controlled = true;

const plane = new Plane();
const plane_transform = plane.get_component(Transform);
const plane_render = plane.get_component(Render);
plane_transform.scale = [20, 1, 20];
plane_transform.position = [0.5, -0.5, 0.5];
plane_render.material = material;
plane_render.color = "333333";

plane.add_component(new RigidBody({
	world: physics_world,
	shape: 'box',
	mass: Infinity
}));

game.add(plane);


const level = new Level({
	rows: integer(2, 5),
	cols: integer(3, 8),
	dir: 1,
	delay: 16,
	enemy_color: (integer(10, 245)).toString(16) + '' + (integer(10, 245)).toString(16) + '' + (integer(10, 245)).toString(16)
});

game.on('tick', (e) => {
	const player_position = level.player.position;

	light.position = [
		player_position.x - enemies_zone.x + 1,
		0,
		-2
	];

	if (player_position.x > 15) {
		level.player.position = {
			x: 15,
			y: player_position.y
		}
	}

	if (player_position.x < -1) {
		level.player.position = {
			x: -1,
			y: player_position.y
		}
	}

	if (~~(e%level.delay) === 0) {
		level.do_step();
	}

	if (game.keys[shoot_key] && !level.is_shooting) {
		level.shoot(player_position);
	}

	if (level.is_shooting) {
		level.bullet.position = {
			x: level.bullet.position.x,
			y: level.bullet.position.y + level.bullet.speed
		}

		level.check_collision();

		if (level.bullet.position.y > 13) {
			level.stop_shooting();
		}
	}

	physics_world.step(1/game.fps);
});
