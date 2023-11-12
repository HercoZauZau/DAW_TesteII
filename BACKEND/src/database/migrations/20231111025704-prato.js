module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('prato', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      rest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      um: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dois: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('prato');
  },
};
