import { Game } from 'cervus/core';
import { PhongMaterial, WireframeMaterial } from 'cervus/materials';
import { Render, Transform } from 'cervus/components';
import { World } from 'cervus/physics';


export const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
	clear_color: '000000',
	// fps: 1
});

export const physics_world = new World();

export const material = new PhongMaterial({
  requires: [ Render, Transform ]
});

export const wire_material = new WireframeMaterial({
  requires: [ Render, Transform ]
});

export const enemies_zone = {
	x: 8,
	y: 11
};

export const shoot_key = 32;

export function lighter_color(col, amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16).substr(0, 8);
}

export const bullet_pool = [];


export const UI = {
	show_overlay() {
		const overlay = document.querySelector('.overlay');
		overlay.style.display = 'block';
	},

	game_over() {
		this.show_overlay();
		document.querySelector('.button.replay').style.display = 'block';
	},

	next_level() {
		this.show_overlay();
		document.querySelector('.button.next_level').style.display = 'block';
	}
}
