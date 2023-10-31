module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fotosR', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      originalName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      rest_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'restaurante',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('fotosR');
  },
};
