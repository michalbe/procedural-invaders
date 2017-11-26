import { Game } from 'cervus/core';
import { PhongMaterial } from 'cervus/materials';
import { Render, Transform } from 'cervus/components';
import { World } from 'cervus/physics';

export const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
	clear_color: '#000000',
	// fps: 1
});

export const physics_world = new World();

export const material = new PhongMaterial({
  requires: [ Render, Transform ]
});

export const enemies_zone = {
	x: 7,
	y: 10
};

export const shoot_key = 32;
