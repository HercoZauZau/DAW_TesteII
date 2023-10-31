import multer from 'multer';
import { extname, resolve } from 'path';

const unique = Math.floor(Math.random() * 1000 + 1000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo deve ser PNG ou JPG.'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${unique}${extname(file.originalname)}`);
    },
  }),
};
