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
      return queryInterface.bulkInsert('Notes', [
        {
          userId: 1,
          notebookId: 1,
          title: "Note 1",
          content: "First note",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Note 2",
          content: "Second note",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Note 3",
          content: "Third note",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          notebookId: 2,
          title: "Note 4",
          content: "Apple",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          notebookId: 2,
          title: "Note 5",
          content: "Durian",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          notebookId: 3,
          title: "Third",
          content: "Nothing!",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          notebookId: 4,
          title: "Test A",
          content: "test notes A",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          notebookId: 5,
          title: "Test B",
          content: "test notes B",
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
      return queryInterface.bulkDelete('Notes', null, {});
  }
};
