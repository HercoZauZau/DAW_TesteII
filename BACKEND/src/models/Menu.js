import Sequelize, { Model } from 'sequelize';

export default class Menu extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

        rest_id: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

        prato: {
          type: Sequelize.STRING,
          defaultValue: '',
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
        tableName: 'menu',
      },
    );
    return this;
  }
}
