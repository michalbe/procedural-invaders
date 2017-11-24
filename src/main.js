import { game, material } from './globals';
import { Plane } from 'cervus/shapes';
import { Render, Transform } from 'cervus/components';

const camera_transform = game.camera.get_component(Transform);
camera_transform.position = [0.424, 0.595, -8.845];
camera_transform.rotation = [-0.112, 0, 0, 0.99];

const plane = new Plane();
const plane_transform = plane.get_component(Transform);
const plane_render = plane.get_component(Render);
plane_transform.scale = [20, 1, 20];
plane_transform.position = [0.5, -0.5, 0.5];
plane_render.material = material;
plane_render.color = "#ff00ff";
game.add(plane);
