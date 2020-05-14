import path from 'path';
import fs from 'fs';
import { isDevelopment, LINK_IMAGES, LINK_VIDEOS, LINK_MATERIALS } from '../../config/server';
import { PATH_IMAGES, PATH_VIDEOS, PATH_MATERIAL } from '../../config/paths';
import { clientVimeo, getSignedUrl } from '../../config/vimeo';

export const Upload = () => {
    const TYPES_UPLOAD = {
        IMAGE: 1,
        VIDEO: 2,
        MATERIAL: 3,
    };

    const imageTypes = ["image/gif", "image/png", "image/jpg", "image/jpeg"];
    const videoTypes = ["video/mp4"];
    const materialTypes = ["application/pdf"];

    const defineFiletype = (type) => {
        const types = [...imageTypes, ...videoTypes, ...materialTypes];
        if (types.includes(type)) {
            return type.split("/").pop();
        }
        return null;
    }

    const justImage = (type) => imageTypes.includes(type);
    const justMaterial = (type) => materialTypes.includes(type);
    const justVideo = (type) => videoTypes.includes(type);

    const defineFilename = (name) => `file${Date.now()}-${String(name).replace(/[^A-Za-z0-9.]+/g, "")}`;

    const getUrl = async(name, typeUpload) => {
        if (name && Object.values(TYPES_UPLOAD).includes(typeUpload)) {
            let isPrivate = false;
            let url = null;
            if (typeUpload === TYPES_UPLOAD.VIDEO) {
                isPrivate = !isDevelopment;
                url = LINK_VIDEOS;
            } else if (typeUpload === TYPES_UPLOAD.IMAGE) {
                url = LINK_IMAGES;
            } else if (typeUpload === TYPES_UPLOAD.MATERIAL) {
                url = LINK_MATERIALS;
            }
            return getSignedUrl({ url, videoId: name, isPrivate });
        }
        return null;
    }

    const getVideoUrl = (name) => getUrl(name, TYPES_UPLOAD.VIDEO);
    const getImageUrl = (name) => getUrl(name, TYPES_UPLOAD.IMAGE);
    const getMaterialUrl = (name) => getUrl(name, TYPES_UPLOAD.MATERIAL);

    const storeLocal = ({ stream, filename, type, typeUpload }) => {
        return new Promise(async (resolve, reject) => {
            if (!type) {
                reject(null);
            }
            let name = await defineFilename(filename);
            //name = `${name}.${type}`;

            let resultPath = null;
            if (typeUpload === TYPES_UPLOAD.VIDEO) {
                resultPath = PATH_VIDEOS;
            } else if (typeUpload === TYPES_UPLOAD.IMAGE) {
                resultPath = PATH_IMAGES;
            } else if (typeUpload === TYPES_UPLOAD.MATERIAL) {
                resultPath = PATH_MATERIAL;
            }
            resultPath = path.resolve(resultPath, name);

            return stream
                .on('error', error => {
                    if (stream.truncated)
                        // delete the truncated file
                        fs.unlinkSync(resultPath);
                    reject(error);
                })
                .pipe(fs.createWriteStream(resultPath))
                .on('error', error => reject(error))
                .on('finish', () => resolve({ path: resultPath, url: getUrl(name, typeUpload), filename: name }));
        });
    }

    const storeVimeo = async ({ absolutePath, name, description }) => {
        try {
            //const fileStats = await fs.statSync(absolutePath);
            const params = {
                name,
                description,
            };

            return new Promise(async (resolve, reject) => {
                try {
                    await clientVimeo.upload(
                        absolutePath,
                        params,
                        async(data) => {
                            if (!data) {
                                reject("ERROR UPLOAD");
                            }
                            // data = /videos/:id
                            const dataSplit = String(data).split('/');
                            if (dataSplit.length >= 3) {
                                const [, , id] = dataSplit;
                                const url = await getVideoUrl(id);
                                resolve({
                                    url,
                                    filename: id,
                                });
                            }
                            resolve(null);
                        },
                        () => { },
                        (err) => {
                            reject(err);
                        }
                    );
                } catch (error) {
                    reject(null);
                }
            });
        } catch (error) { }
        return null;
    }

    const upload = async ({ file, name, description, typeUpload = TYPES_UPLOAD.IMAGE }) => {
        if (file && Object.values(TYPES_UPLOAD).includes(typeUpload)) {
            const elementFile = await file;
            if (elementFile) {
                let isPrivate = false;
                const { createReadStream, filename, mimetype, encoding } = elementFile;

                const stream = createReadStream();
                const type = defineFiletype(mimetype);
                
                if (typeUpload === TYPES_UPLOAD.VIDEO) {
                    if (!justVideo(mimetype)) {
                        return null;
                    }
                    if (!isDevelopment) {
                        return storeVimeo({
                            absolutePath: stream && stream.path,
                            name,
                            description
                        });
                    }
                } else if (typeUpload === TYPES_UPLOAD.MATERIAL) {
                    if (!justMaterial(mimetype)) {
                        return null;
                    }
                    isPrivate = true;
                } else {
                    if (!justImage(mimetype)) {
                        return null;
                    }
                }

                if (type) {
                    //return storeLocal({ stream, filename, type, isPrivate, typeUpload });
                }
            }
        }
        return null;
    }

    return {
        TYPES_UPLOAD,
        defineFiletype,
        getVideoUrl,
        getImageUrl,
        getMaterialUrl,
        upload,
        uploadImage: (file) => upload({ file, typeUpload: TYPES_UPLOAD.IMAGE }),
        uploadVideo: (file, name, description) => upload({ file, name, description, typeUpload: TYPES_UPLOAD.VIDEO }),
        uploadMaterial: (file) => upload({ file, typeUpload: TYPES_UPLOAD.MATERIAL }),
    }
};

export default Upload;