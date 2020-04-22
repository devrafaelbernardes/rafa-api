import dotenv from 'dotenv';
dotenv.config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || null;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || null;
export const BUCKET_AWS_S3 = process.env.BUCKET_AWS_S3 || null;
export const ENDPOINT_SPACE = process.env.ENDPOINT_SPACE || null;

export const KEY_SECRET_JWT = process.env.KEY_SECRET_JWT || "testJWT12345689851541512154";
export const KEY_SECRET_CRYPTO = process.env.KEY_SECRET_CRYPTO || "testJWT1@sdasd4s5aad8as4d8";

export const PORT = 4040;
export const isDevelopment = process.env.NODE_ENV !== "production";
export const BASE_ROUTE = "/";
export const LINK_SERVER = isDevelopment ? `http://localhost:${PORT}/` : `https://api.rbernardes.com.br${BASE_ROUTE}`;
export const LINK_SERVER_ASSETS = isDevelopment ? `http://localhost:${PORT}/` : `https://rafaspaceasws3.s3.amazonaws.com/`;
export const LINK_IMAGES = LINK_SERVER_ASSETS + (isDevelopment ? 'image/' : '');
export const LINK_MATERIALS = LINK_SERVER_ASSETS + (isDevelopment ? 'material/' : '');
export const LINK_VIDEOS = LINK_SERVER_ASSETS + (isDevelopment ? 'video/' : '');

export const ROUTE = {
    HOME: '/',
    GRAPHQL: '/api',
    IMAGE: '/image',
    MATERIAL: '/material',
    VIDEO: '/video',
};