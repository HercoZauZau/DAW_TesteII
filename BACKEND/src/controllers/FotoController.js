import multer from 'multer';
import multerConfig from '../config/multerConfig';

import FotoR from '../models/FotoR';

const upload = multer(multerConfig).single('foto');

class FotoRController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        // console.log(error);
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { rest_id } = req.body;
        const foto = await FotoR.create({ originalname, filename, rest_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Nenhuma conta com essa ID.'],
        });
      }
    });
  }
}

export default new FotoRController();
