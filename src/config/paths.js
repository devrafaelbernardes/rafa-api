import { isDevelopment } from './server';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const DEFAULT_PATH_IMAGES = isDevelopment ? path.join(__dirname, '..', '..', '..', 'images_api') : path.join(__dirname, '..', '..', 'images_api');
const DEFAULT_PATH_MATERIALS = isDevelopment ? path.join(__dirname, '..', '..', '..', 'images_api') : path.join(__dirname, '..', '..', 'images_api');
const DEFAULT_PATH_VIDEOS = isDevelopment ? path.join(__dirname, '..', '..', '..', 'images_api') : path.join(__dirname, '..', '..', 'images_api');

export const PATH_IMAGES = process.env.PATH_IMAGES || DEFAULT_PATH_IMAGES;
export const PATH_MATERIAL = process.env.PATH_MATERIAL || DEFAULT_PATH_MATERIALS;
export const PATH_VIDEOS = process.env.PATH_VIDEOS || DEFAULT_PATH_VIDEOS;
export const PATH_BAG_IMAGES = path.join(PATH_IMAGES, 'bags');
export const PATH_MEDIA_IMAGES = path.join(PATH_IMAGES, 'medias');
export const PATH_SOCIAL_NETWORK_IMAGES = path.join(PATH_IMAGES, 'social_networks');
export const PATH_OTHERS_IMAGES = path.join(PATH_IMAGES, 'others');