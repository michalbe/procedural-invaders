import { Game } from 'cervus/core';
import { PhongMaterial } from 'cervus/materials';
import { Render, Transform } from 'cervus/components';

export const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
	clear_color: '#000000',
	// fps: 1
});

export const material = new PhongMaterial({
  requires: [ Render, Transform ]
});
