module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'menu',
    [
      {
        user_id: 1,
        rest_id: 1,
        prato: 'Frango',
        estado: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
