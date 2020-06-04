import multer from 'multer';
import { PATH_IMAGES } from '../config/paths';
import Upload from '../classes/models/Upload';

const classUpload = Upload();

const storageLOCAL = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH_IMAGES);
    },
    filename: (req, file, cb) => {
        file.key = classUpload.defineFilename(file.originalname);
        cb(null, file.key)
    }
});

export const configMulter = {
    dest : PATH_IMAGES,
    storage : storageLOCAL,
};

export { multer };
export default multer;