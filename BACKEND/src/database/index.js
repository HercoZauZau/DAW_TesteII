import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Restaurante from '../models/Restaurante';
import Usuario from '../models/Usuario';
import FotoR from '../models/FotoR';
import Avaliacao from '../models/Avaliacao';

const models = [Restaurante, Usuario, FotoR, Avaliacao];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
