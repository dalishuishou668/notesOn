'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Notebooks', [
        {
          userId: 1,
          title: 'First Notebook',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          title: 'Second Notebook',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          title: 'Third Notebook',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          title: 'Javascript',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          title: 'Express',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          title: 'test C',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          title: 'test D',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
