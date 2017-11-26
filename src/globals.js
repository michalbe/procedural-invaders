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
	y: 11
};

export const shoot_key = 32;

export function lighter_color(col, amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    console.log(col, newColor.toString(16));
    return newColor.toString(16);
}
