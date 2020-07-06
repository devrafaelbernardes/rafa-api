import dotenv from 'dotenv';
dotenv.config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || null;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || null;
export const BUCKET_AWS_S3 = process.env.BUCKET_AWS_S3 || null;
export const ENDPOINT_SPACE = process.env.ENDPOINT_SPACE || null;

export const KEY_VIMEO_ID = process.env.KEY_VIMEO_ID || null;
export const KEY_VIMEO_SECRET = process.env.KEY_VIMEO_SECRET || null;
export const KEY_VIMEO_TOKEN = process.env.KEY_VIMEO_TOKEN || null;

export const KEY_SECRET_JWT = process.env.KEY_SECRET_JWT || "testJWT12345689851541512154";
export const KEY_SECRET_CRYPTO = process.env.KEY_SECRET_CRYPTO || "testJWT1@sdasd4s5aad8as4d8";

export const PORT = 4040;
export const isDevelopment = process.env.NODE_ENV !== "production";
export const BASE_ROUTE = "/";
export const LINK_SERVER = isDevelopment ? `http://localhost:${PORT}/` : `https://api.rbernardes.com.br${BASE_ROUTE}`;

const LINK_EAD = isDevelopment ? `http://localhost:3020/` : `https://ead.rbernardes.com.br/`;
export const LINK_VALIDATE_EMAIL = `${LINK_EAD}validate/`;
export const LINK_FORGET_PASSWORD = `${LINK_EAD}reset/`;
export const LINK_COURSE_ACCESS = `${LINK_EAD}access/`;

export const LINK_SERVER_ASSETS = LINK_SERVER;//isDevelopment ? `http://localhost:${PORT}/` : `https://rafaspaceasws3.s3.amazonaws.com/`;

export const LINK_IMAGES = LINK_SERVER_ASSETS + 'image/';
export const LINK_MATERIALS = LINK_SERVER_ASSETS + 'material/';
export const LINK_VIDEOS = LINK_SERVER_ASSETS + 'video/';

export const PORT_EMAIL = process.env.PORT_EMAIL;
export const HOST_EMAIL = process.env.HOST_EMAIL;
export const USER_EMAIL = process.env.USER_EMAIL;
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

export const ROUTE = {
    HOME: '/',
    GRAPHQL: '/api',
    IMAGE: '/image',
    TEMPLATES_EMAIL: '/emails',
    MATERIAL: '/material',
    VIDEO: '/video',
    UPLOAD: '/upload',
    ADMIN_QUEUES: '/admin/queues',
};