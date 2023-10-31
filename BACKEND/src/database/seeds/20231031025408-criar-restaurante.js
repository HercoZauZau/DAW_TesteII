module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'restaurante',
    [
      {
        nome: 'Mimos',
        info: 'A',
        horario: 'A',
        local: 'A',
        cozinha: 'A',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
