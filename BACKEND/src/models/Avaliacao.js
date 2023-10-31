import Sequelize, { Model } from 'sequelize';

export default class Avaliacao extends Model {
  static init(sequelize) {
    super.init(
      {

        user_id: {
          type: Sequelize.INTEGER,
          defaultValue: '',
        },

        rest_id: {
          type: Sequelize.INTEGER,
          defaultValue: '',
        },

        nota: {
          type: Sequelize.INTEGER,
          defaultValue: '',
        },

        comentario: {
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
        // freezeTableName: true, // Evita a pluralização do nome da tabela
        tableName: 'avaliacao',
      },
    );
    return this;
  }
}
