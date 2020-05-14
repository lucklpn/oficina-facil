module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admnistrador',
          login: 'admin',
          password:
            '$2a$08$rHItsJO3G0QW6Euu2Pq0oOiYPM1515bfmyzPM6ks3XiC49CCiFUqi' /* awm@admin */,
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
