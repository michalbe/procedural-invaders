import { Plane } from 'cervus/shapes';
import { Render, Transform, Move } from 'cervus/components';
import { game, material } from './globals';
import { set_seed } from 'cervus/core/random';
import { Level } from './level';

set_seed(198007);

window.game = game.light.get_component(Transform);
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
plane_render.color = "#ff00ff";
game.add(plane);


const level = new Level();
