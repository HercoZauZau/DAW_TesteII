import Sequelize, { Model } from 'sequelize';

export default class Menu extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        rest_id: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

        um: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        dois: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        estado: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },

      },
      {
        sequelize,
        tableName: 'prato',
      },
    );
    return this;
  }
}
