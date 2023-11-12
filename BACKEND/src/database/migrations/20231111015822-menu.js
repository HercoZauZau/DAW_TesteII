module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menu', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      rest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      prato: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('menu');
  },
};
