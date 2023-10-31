module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('restaurante', {

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

      info: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      horario: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      local: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cozinha: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('restaurante');
  },
};
