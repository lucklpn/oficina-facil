module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'payment_methods',
      [
        {
          description: 'Dinheiro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Cartão de Crédito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Cartão de Débito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Outro',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('payment_methods', null, {});
  },
};
