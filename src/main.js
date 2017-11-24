import { Game } from 'cervus/core';
import { Box, Plane } from 'cervus/shapes';
import { PhongMaterial } from 'cervus/materials';
import { Render, Transform, Move } from 'cervus/components';

export const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  // fps: 1
	clear_color: '#000000'
});


const camera_transform = game.camera.get_component(Transform);
camera_transform.position = [0.424, 0.595, -8.845];
camera_transform.rotation = [-0.112, 0, 0, 0.99];
window.camera = camera_transform;

const material = new PhongMaterial({
  requires: [ Render, Transform ]
});

const box = new Box();
box.get_component(Transform).position = [ 0, 0, 3 ];
window.box_transform = box.get_component(Transform);
box.get_component(Render).material = material;
box.get_component(Render).color = '0F0';
game.add(box);

const plane = new Plane();
const plane_transform = plane.get_component(Transform);
const plane_render = plane.get_component(Render);
plane_transform.scale = [20, 1, 20];
plane_transform.position = [0.5, -0.5, 0.5];
plane_render.material = material;
plane_render.color = "#ff00ff";
game.add(plane);
