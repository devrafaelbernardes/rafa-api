import { awsS3, options, Bucket, getSignedUrl } from '../../config/awsS3';
import path from 'path';
import fs from 'fs';
import { isDevelopment, LINK_IMAGES, LINK_VIDEOS, LINK_MATERIALS } from '../../config/server';
import { PATH_IMAGES, PATH_VIDEOS, PATH_MATERIAL } from '../../config/paths';

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

    const getParams = (file, filename, isPrivate = false) => ({
        Body: file,
        Bucket,
        Key: filename,
        ACL: isPrivate ? 'private' : 'public-read'
    });

    const getParamsDelete = (file) => ({
        Bucket,
        Key: file,
    });

    const getUrl = (name, typeUpload) => {
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
            return getSignedUrl({ url, name, isPrivate });
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

    const storeAwsS3 = async ({ stream, filename, isPrivate = false }) => {
        try {
            const name = await defineFilename(filename);
            const params = getParams(stream, name, isPrivate);

            return new Promise(async (resolve, reject) => {
                await awsS3.upload(params, options, (err, data) => {
                    if (err || !data) {
                        reject("ERROR UPLOAD");
                    }
                    resolve({
                        url: data.Location,
                        filename: name,
                    });
                });
            });
        } catch (error) { }
        return null;
    }

    const removeAwsS3 = async ({ name }) => {
        try {
            const params = getParamsDelete(name);

            await awsS3.deleteObject(params, options, (err, data) => {
                return new Promise(async (resolve, reject) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            });
        } catch (error) { }
        return false;
    }

    const upload = async (file, typeUpload = TYPES_UPLOAD.IMAGE) => {
        if (file && Object.values(TYPES_UPLOAD).includes(typeUpload)) {
            const elementFile = await file;
            if (elementFile) {
                let isPrivate = false;
                const { createReadStream, filename, mimetype, encoding } = elementFile;

                if (typeUpload === TYPES_UPLOAD.VIDEO) {
                    if (!justVideo(mimetype)) {
                        return null;
                    }
                    isPrivate = true;
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

                const stream = createReadStream();
                const type = defineFiletype(mimetype);
                if (type) {
                    const options = { stream, filename, type, isPrivate, typeUpload };
                    if (!isDevelopment) {
                        return storeAwsS3(options);
                    }
                    return storeLocal(options);
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
        uploadImage: (file) => upload(file, TYPES_UPLOAD.IMAGE),
        uploadVideo: (file) => upload(file, TYPES_UPLOAD.VIDEO),
        uploadMaterial: (file) => upload(file, TYPES_UPLOAD.MATERIAL),
        async remove({ path, fileName }) {
            try {
                if (path) {
                    if (isDevelopment) {
                        fs.unlinkSync(path);
                        return true;
                    } else {
                        return removeAwsS3({ name: fileName });
                    }
                }
            } catch (error) { }
            return false;
        },
    }
};

export default Upload;