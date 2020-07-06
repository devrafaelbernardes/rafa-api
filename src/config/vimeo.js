import { Vimeo } from 'vimeo';
import { KEY_VIMEO_ID, KEY_VIMEO_SECRET, KEY_VIMEO_TOKEN } from './server';

export const clientVimeo = new Vimeo(KEY_VIMEO_ID, KEY_VIMEO_SECRET, KEY_VIMEO_TOKEN);

const request = async(options) => {
    try {
        return new Promise(async(resolve, reject) => {
            await clientVimeo.request(options, (error, body, status_code, headers) => {
                resolve(body && body.link);
            });
        });
    } catch (error) {}
    return null;
}

export const getVideoUrl = async ({ videoId }) => {
    if (videoId) {
        try {
            return await request({
                method: 'GET',
                path: `/videos/${videoId}`,
            });
        } catch (error) {}
    }
    return null;
}

export const getSignedUrl = async({ url, videoId, isPrivate = false }) => {
    if (url || videoId) {
        try {
            if (!isPrivate) {
                return `${url}${videoId}`;
            }
            const link = await getVideoUrl({ videoId });
            return link || "";
        } catch (error) { }
    }
    return null;
}