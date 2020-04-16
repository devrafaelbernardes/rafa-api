import { awsS3, options, Bucket } from '../../config/awsS3';
import path from 'path';
import fs from 'fs';
import { isDevelopment, LINK_IMAGES } from '../../config/server';
import { PATH_IMAGES } from '../../config/paths';

export const Upload = () => {
    const defineFiletype = (type) => {
        const types = ["image/gif", "image/png", "image/jpg", "image/jpeg", "video/mp4"];
        if (types.includes(type)) {
            return type.split("/").pop();
        }
        return null;
    }

    const justVideo = (type) => {
        const types = ["video/mp4"];
        if (types.includes(type)) {
            return true;
        }
        return false;
    }

    const defineFilename = (name) => {
        return `file${Date.now()}-${String(name).replace(/[^A-Za-z0-9.]+/g, "")}`;
    }

    const getParams = (file, filename) => ({
        Body: file,
        Bucket,
        Key: filename,
        ACL: 'private'
    });

    const getParamsDelete = (file) => ({
        Bucket,
        Key: file,
    });

    const storeLocal = ({ stream, filename, type }) => {
        return new Promise(async(resolve, reject) => {
            if (!type) {
                reject(null);
            }
            let name = await defineFilename(filename);
            //name = `${name}.${type}`;

            const result_path = path.resolve(PATH_IMAGES, name);

            return stream
                .on('error', error => {
                    if (stream.truncated)
                        // delete the truncated file
                        fs.unlinkSync(result_path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(result_path))
                .on('error', error => reject(error))
                .on('finish', () => resolve({ path: result_path, url: `${LINK_IMAGES}${filename}`, filename : name }));
        });
    }

    const storeAwsS3 = async ({ stream, filename }) => {
        try {
            const name = await defineFilename(filename);
            const params = getParams(stream, name);

            return new Promise(async (resolve, reject) => {
                await awsS3.upload(params, options, (err, data) => {
                    console.log(err, data, "UPLOAD AWSS3");
                    
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

    return {
        defineFiletype,
        async upload(file, isVideo = false) {
            if (file) {
                const elementFile = await file;
                console.log("ELEMENT FILE:",elementFile);
                
                if (elementFile) {
                    const { createReadStream, filename, mimetype, encoding } = elementFile;
                    console.log("FILENAME:",filename, justVideo(mimetype));
                    // valida se é video
                    if (isVideo && !justVideo(mimetype)) {
                        return null;
                    }
                    const stream = createReadStream();
                    const type = defineFiletype(mimetype);
                    if (type) {
                        const options = { stream, filename, type };
                        if (!isDevelopment) {
                            return storeAwsS3(options);
                        }
                        return storeLocal(options);
                    }
                }
            }
        },
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