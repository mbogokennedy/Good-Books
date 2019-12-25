module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Kennedy Mbogo',
        email: 'mbogokennedy@gmail.com',
        password: 'mosesm20123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kennedy Mbogo',
        email: 'kennedymbogo@gmail.com',
        password: 'mosesm2012',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
