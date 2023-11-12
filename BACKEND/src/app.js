import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import avaliacaoRoutes from './routes/avaliacaoRoutes';
import menuRoutes from './routes/menuRoutes';
import pratoRoutes from './routes/pratoRoutes';
import restauranteRoutes from './routes/restauranteRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  'http://localhost:3000', // exemplo
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', userRoutes);
    this.app.use('/restaurante/', restauranteRoutes);
    this.app.use('/avaliacao/', avaliacaoRoutes);
    this.app.use('/menu/', menuRoutes);
    this.app.use('/prato/', pratoRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
