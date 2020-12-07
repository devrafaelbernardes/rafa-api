import { isDevelopment } from './server';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const DEFAULT_PATH_IMAGES = isDevelopment ? path.resolve(__dirname, '..', '..', '..', 'images_api') : path.resolve(__dirname, '..', '..', 'images_api');
const DEFAULT_PATH_MATERIALS = isDevelopment ? path.resolve(__dirname, '..', '..', '..', 'images_api') : path.resolve(__dirname, '..', '..', 'images_api');
const DEFAULT_PATH_VIDEOS = isDevelopment ? path.resolve(__dirname, '..', '..', '..', 'images_api') : path.resolve(__dirname, '..', '..', 'images_api');
const DEFAULT_PATH_MODELING = isDevelopment ? path.resolve(__dirname, '..', '..', '..', 'images_api') : path.resolve(__dirname, '..', '..', 'images_api');

export const PATH_IMAGES = process.env.PATH_IMAGES || DEFAULT_PATH_IMAGES;
export const PATH_MATERIAL = process.env.PATH_MATERIAL || DEFAULT_PATH_MATERIALS;
export const PATH_VIDEOS = process.env.PATH_VIDEOS || DEFAULT_PATH_VIDEOS;
export const PATH_MODELING = process.env.PATH_MODELING || DEFAULT_PATH_MODELING;
export const PATH_BAG_IMAGES = path.resolve(PATH_IMAGES, 'bags');
export const PATH_MEDIA_IMAGES = path.resolve(PATH_IMAGES, 'medias');
export const PATH_SOCIAL_NETWORK_IMAGES = path.resolve(PATH_IMAGES, 'social_networks');
export const PATH_OTHERS_IMAGES = path.resolve(PATH_IMAGES, 'others');

export const PATH_PUBLIC = path.resolve(__dirname, '..', '..', 'public');
export const PATH_TEMPLATES = path.resolve(__dirname, '..', 'templates');
export const PATH_TEMPLATES_EMAILS = path.resolve(PATH_TEMPLATES, 'emails');

export const PATH_LAYOUTS_EMAILS = path.resolve(PATH_TEMPLATES_EMAILS, 'layouts');
export const PATH_PARTIALS_EMAILS = path.resolve(PATH_TEMPLATES_EMAILS, 'partials');
export const PATH_AUTH_EMAILS = path.resolve(PATH_TEMPLATES_EMAILS, 'auth');
export const PATH_PROMOTION_EMAILS = path.resolve(PATH_TEMPLATES_EMAILS, 'promotions');

export const TEMPLATE_WELCOME_EMAIL = path.resolve(PATH_AUTH_EMAILS, 'welcome.hbs');
export const TEMPLATE_FORGOT_PASSWORD_EMAIL = path.resolve(PATH_AUTH_EMAILS, 'forgotPassword.hbs');
export const TEMPLATE_COURSE_ACCESS_EMAIL = path.resolve(PATH_AUTH_EMAILS, 'courseAccess.hbs');