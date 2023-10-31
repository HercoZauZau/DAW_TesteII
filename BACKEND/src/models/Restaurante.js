import Sequelize, { Model } from 'sequelize';

export default class Restaurante extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'Nome deve ter entre 3 e 50 caracteres.',
            },
          },
        },

        info: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        horario: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        local: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        cozinha: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

      },
      {
        sequelize,
        tableName: 'restaurante',
      },
    );
    return this;
  }
}
