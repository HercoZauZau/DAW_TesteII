import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Restaurante from '../models/Restaurante';
import Usuario from '../models/Usuario';
import FotoR from '../models/FotoR';
import Avaliacao from '../models/Avaliacao';
import Menu from '../models/Menu';
import Prato from '../models/Prato';

const models = [Restaurante, Usuario, FotoR, Avaliacao, Menu, Prato];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
